import { describe, expect, it } from 'vitest';
import {
    Form,
    InvalidLabelError,
    LabelExistsError,
    LabelNotFoundError,
} from '@core/model/form/form';
import { getValidator, InvalidValueTypeError, ValidatorKey } from './validator';

describe('Form', () => {
    let sut: Form;

    beforeEach(() => {
        sut = new Form();
    });

    describe('adding a new field', () => {
        it.each(['', ' ', 'l a bel', '135', 'inv4lid', 'test&test'])(
            'should throw an error when given label "%s" is invalid',
            (label) => {
                expect(() => sut.addField({ label })).toThrow(
                    InvalidLabelError,
                );
            },
        );

        it.each(['label', 'validLabel', 'test'])(
            'should not throw any error when given label "%s" is valid',
            (label) => {
                expect(() => sut.addField({ label })).not.toThrow();
            },
        );

        it.each(['firstname', 'lastname', 'age'])(
            'should add a new field given valid label "%s"',
            (label) => {
                sut.addField({ label });
                expect(sut.getFieldFrom(label)).toBeDefined();
            },
        );

        it.each(['birthdate', 'company', 'telephone'])(
            'should throw an error when trying to add twice the same field with label "%s"',
            (label) => {
                sut.addField({ label });
                expect(() => sut.addField({ label })).toThrow(LabelExistsError);
            },
        );

        it.each([
            ['firstname', 'Jackie'],
            ['birthDate', new Date('2001-10-18')],
            ['amount', 934],
        ])(
            'should add a new field given valid label "%s" and value "%s"',
            (label, value) => {
                sut.addField({ label, value });
                expect(sut.getFieldFrom(label).getValue()).toBe(value);
            },
        );
    });

    describe('updating an existing field value', () => {
        it('should throw an error when given field does not exist', () => {
            expect(() =>
                sut.setField({ label: 'notExistingLabel', value: '' }),
            ).toThrow(LabelNotFoundError);
        });

        it('should not throw an error when given field exists', () => {
            const label = 'firstname';
            sut.addField({ label });

            expect(() => sut.setField({ label, value: '' })).not.toThrow();
        });

        it.each([
            ['firstname', 'Jackie'],
            ['telephone', '0883770012'],
            ['telephone', '0883770012'],
            ['isGreatest', true],
        ])('should update field "%s" value to "%s"', (label, value) => {
            sut.addField({ label });

            const initialValue = sut.getFieldFrom(label).getValue();
            sut.setField({ label, value });
            const newValue = sut.getFieldFrom(label).getValue();

            expect(initialValue).not.toBe(newValue);
            expect(newValue).toBe(value);
        });
    });

    describe('checking whether a field is valid', () => {
        it('should throw an error when given field does not exist', () => {
            expect(() => sut.valid('notExistingLabel')).toThrow();
        });

        it('should not throw an error when given field exists', () => {
            const label = 'lastname';
            sut.addField({ label });
            expect(() => sut.valid(label)).not.toThrow();
        });

        it.each([
            ['firstname', ' '],
            ['lastname', ''],
            ['birthDate', null],
            ['age', 991],
            ['isCool', false],
            ['isCool', true],
        ])(
            'should always return true when no constraint has been given',
            (label, value) => {
                sut.addField({ label, value });
                expect(sut.valid(label)).toBe(true);
            },
        );

        describe('one validator', () => {
            const onlyNumericWithOptionalDecimals = /^\d+(\.\d{1,2})?$/;
            const onlyTenDigits = /^0[1-9]\d{8}$/;
            const onlyAlphabeticCharacters = /^[a-zA-Z]+$/;

            it.each([
                ['firstname', 'T est', onlyAlphabeticCharacters],
                ['firstname', 'invalid123', onlyAlphabeticCharacters],
                ['firstname', '', onlyAlphabeticCharacters],
                ['firstname', ' ', onlyAlphabeticCharacters],
                ['telephone', '+33612345678', onlyTenDigits],
                ['telephone', '124', onlyTenDigits],
                ['telephone', '', onlyTenDigits],
                ['amount', NaN, onlyNumericWithOptionalDecimals],
                ['amount', 'test', onlyNumericWithOptionalDecimals],
                ['amount', 'invalid', onlyNumericWithOptionalDecimals],
                ['amount', ' ', onlyNumericWithOptionalDecimals],
            ])(
                'should return false when given validator is not fulfilled',
                (label, value, validator) => {
                    sut.addField({ label, value, validators: [validator] });
                    expect(sut.valid(label)).toBe(false);
                },
            );
        });

        describe('several validators', () => {
            const onlyThreeCharacterLength = /^.{3}$/;
            const onlyAlphaNumericCharacters = /^[a-zA-Z0-9]+$/;

            it.each([
                [
                    'firstname',
                    'ab@',
                    [onlyThreeCharacterLength, onlyAlphaNumericCharacters],
                ],
                [
                    'firstname',
                    'abcd',
                    [onlyAlphaNumericCharacters, onlyThreeCharacterLength],
                ],
            ])(
                'should return false when at least one validator is not fulfilled',
                (label, value, validators) => {
                    sut.addField({ label, value, validators });
                    expect(sut.valid(label)).toBe(false);
                },
            );

            it.each([
                [false, ''],
                [false, ' '],
                [true, 'short name phrase'],
                [false, 0],
                [false, 491],
                [false, 'test123'],
                [false, 'symbol#'],
                [false, null],
                [false, undefined],
            ])('should return "%s" for given value "%s"', (expected, value) => {
                const LETTERS_AND_SPACES_PATTERN = /^(?!\s+$)[a-zA-ZÀ-ÿ\s]+$/;
                const STRING_DEFINED_PATTERN = /^(?!\s*$).+/;

                const label = 'name';
                const validators = [
                    LETTERS_AND_SPACES_PATTERN,
                    STRING_DEFINED_PATTERN,
                ];

                sut.addField({ label, value, validators });
                expect(sut.valid(label)).toBe(expected);
            });
        });

        describe('array', () => {
            it('should throw an error when checking field length although it is not an array', () => {
                const label = 'firstname';
                sut.addField({
                    label,
                    value: ' ',
                    validators: [getValidator(ValidatorKey.MinLengthTwo)],
                });

                expect(() => sut.valid(label)).toThrow(InvalidValueTypeError);
            });

            it.each([
                [true, ['a', 'b', 'c']],
                [false, ['a']],
            ])('should return "%s" for given array "%s"', (expected, value) => {
                const label = 'firstname';
                sut.addField({
                    label,
                    value,
                    validators: [getValidator(ValidatorKey.MinLengthTwo)],
                });

                expect(sut.valid(label)).toBe(expected);
            });
        });
    });

    describe('extracting raw values', () => {
        it('should extract all fields as plain object', () => {
            sut.addField({ label: 'firstname', value: 'Pedro' });
            sut.addField({ label: 'lastname', value: 'Pascal' });
            sut.addField({ label: 'nickname', value: 'El Hombre' });
            sut.addField({ label: 'isCool', value: true });

            const rawValues = sut.raw();
            expect(rawValues['firstname']).toBe('Pedro');
            expect(rawValues['lastname']).toBe('Pascal');
            expect(rawValues['nickname']).toBe('El Hombre');
            expect(rawValues['isCool']).toBe(true);
        });
    });
});
