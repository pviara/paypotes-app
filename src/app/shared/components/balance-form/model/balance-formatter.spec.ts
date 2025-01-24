import { BalanceFormatter } from '@shared/components/balance-form/model/balance-formatter';
import { describe, expect, it } from 'vitest';

describe('BalanceFormatter', () => {
    let sut: BalanceFormatter;

    const knownKeyboard: Array<string> = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        ',',
        '0',
        'delete',
    ];

    const knownKeyboardDigits = knownKeyboard.filter((key) =>
        Number.isFinite(+key),
    );

    beforeEach(() => {
        sut = new BalanceFormatter();
    });

    describe('default behaviour', () => {
        it('should expose default keyboard', () => {
            const keyboard = sut.getKeyboard();
            expect(keyboard).toEqual(knownKeyboard);
        });

        it('should expose default formatted balance', () => {
            const balance = sut.getBalance();
            expect(balance).toBe('');
        });
    });

    describe('append', () => {
        it('should not append unknown key to balance', () => {
            expect(() => sut.append('unknown key')).toThrow();
        });

        it.each(knownKeyboardDigits.filter((digit) => digit !== '0'))(
            'should append given first digit "%s" to balance (except for zero)',
            (key) => {
                sut.append(key);
                expect(sut.getBalance()).toBe(key);
            },
        );

        it.each(['0', ','])(
            'should not append specific key "%s" when it is the first key to be given',
            (key) => {
                sut.append(key);
                expect(sut.getBalance()).toBe('');
            },
        );

        it('should append key "0" when balance contains at least one digit', () => {
            sut.append('8');
            sut.append('0');
            expect(sut.getBalance()).toBe('80');
        });

        it('should append key "," when balance contains at least one digit', () => {
            sut.append('8');
            sut.append('0');
            expect(sut.getBalance()).toBe('80');
        });

        it.each([
            [['3', '6', '1'], '361'],
            [['2', '0', ',', '9'], '20,9'],
            [['0', '5', '4'], '54'],
            [['2', '4', '7', ',', '5', '3'], '247,53'],
            [['2', '9', 'delete', '1'], '21'],
            [['6', '7', '4', 'delete', '8'], '678'],
            [['delete'], ''],
        ])(
            'should append keys "%s" to format balance like this: "%s"',
            (keys, format) => {
                keys.forEach((key) => sut.append(key));
                expect(sut.getBalance()).toBe(format);
            },
        );

        it('should not append any more one comma', () => {
            sut.append('9');
            sut.append(',');
            sut.append(',');
            sut.append('3');
            sut.append('1');
            expect(sut.getBalance()).toBe('9,31');
        });

        it('should not append any more than two digits after comma', () => {
            sut.append('9');
            sut.append(',');
            sut.append('3');
            sut.append('1');
            sut.append('5');
            expect(sut.getBalance()).toBe('9,31');
        });

        it('should not append any more than three digits before comma', () => {
            sut.append('4');
            sut.append('3');
            sut.append('6');
            sut.append('8');
            expect(sut.getBalance()).toBe('436');
        });
    });
});
