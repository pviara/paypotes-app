import { describe, it } from 'vitest';
import { mapPhoneNumberOutOf } from '@shared/directives/formatter';

describe('mapPhoneNumberOutOf', () => {
    describe('invalid value', () => {
        it('should throw an error when given value is empty', () => {
            expect(() => mapPhoneNumberOutOf('')).toThrow();
        });

        it.each([
            '11111111111111',
            '11 11 11 11 11 11 11',
            '06712288339911',
            '+33689704433269',
        ])(
            'should throw an error when given value "%s" contains more than 13 figures',
            (value) => {
                expect(() => mapPhoneNumberOutOf(value)).toThrow();
            },
        );

        it.each(['a', 'b', '0s', '06kao931S9mqs', '+33785f698877'])(
            'should throw an error when given value "%s" contains letter(s)',
            (value) => {
                expect(() => mapPhoneNumberOutOf(value)).toThrow();
            },
        );

        it.each(['@', '#', ',', '-33'])(
            'should throw an error when given value "%s" contains symbols that are not "+"',
            (value) => {
                expect(() => mapPhoneNumberOutOf(value)).toThrow();
            },
        );

        it.each(['3910 21 93 8', '300192940'])(
            'should throw an error when given value "%s" is not minimum figures length',
            (value) => {
                expect(() => mapPhoneNumberOutOf(value)).toThrow();
            },
        );

        it.each(['0938 21 9922', '0123819222', '+5601 92 38 99'])(
            'should throw an error when given value "%s" does not start by 06 or 07 or +33',
            (value) => {
                expect(() => mapPhoneNumberOutOf(value)).toThrow();
            },
        );

        it.each(['+33 6 82 12 90 1', '+33 7 71 82 022'])(
            'should throw an error when given value "%s" has indicator +33 and is less than 12 figures',
            (value) => {
                expect(() => mapPhoneNumberOutOf(value)).toThrow();
            },
        );
    });

    describe('valid value', () => {
        it('should not throw an error when given value contains "+"', () => {
            expect(() =>
                mapPhoneNumberOutOf('+33 6 19 20 39 14'),
            ).not.toThrow();
        });

        it.each(['06 11 1 1 111 1111', '07022910221'])(
            'should not throw an error when given value "%s" contains between 10 and 13 figures',
            (value) => {
                expect(() => mapPhoneNumberOutOf(value)).not.toThrow();
            },
        );

        it.each([
            ['0782137721', '0782137721'],
            ['0782137721', '+33782137721'],
            ['0782137721', '0782 13 772 1'],
            ['0782137721', '+33 0782 13 7721'],
            ['0689221199', '+33689221 199'],
            ['0608271873', '+330608271873'],
        ])('should return "%s" when given value is "%s"', (expected, value) => {
            const result = mapPhoneNumberOutOf(value);
            expect(result).toBe(expected);
        });
    });
});
