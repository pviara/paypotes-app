import { describe, it } from 'vitest';
import { Form, InvalidLabelError, LabelExistsError } from './form';

describe('Form', () => {
    let sut: Form;

    beforeEach(() => {
        sut = new Form();
    });

    describe('setField', () => {
        it.each(['', ' ', 'l a bel', '135', 'inv4lid', 'test&test'])(
            'should throw an error when given label "%s" is invalid',
            (label) => {
                expect(() => sut.setField(label)).toThrow(InvalidLabelError);
            },
        );

        it.each(['label', 'validLabel', 'test'])(
            'should not throw any error when given label "%s" is valid',
            (label) => {
                expect(() => sut.setField(label)).not.toThrow();
            },
        );

        it.each(['firstname', 'lastname', 'age'])(
            'should set a new field given valid label "%s"',
            (label) => {
                sut.setField(label);
                expect(sut.getFieldLabels()).toContain(label);
            },
        );

        it.each(['birthdate', 'company', 'telephone'])(
            'should throw an error when trying to add twice the same label "%s"',
            (label) => {
                sut.setField(label);
                expect(() => sut.setField(label)).toThrow(LabelExistsError);
            },
        );
    });
});
