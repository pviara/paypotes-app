import { describe, it } from 'vitest';

function formatBalance(balance: string): string {
    if (!balance) {
        return balance;
    }

    let formatted = balance;
    while (formatted.length < 4) {
        formatted += '0';
    }

    return `${formatted.slice(0, -2)},${formatted.slice(-2)}`;
}

describe('formatBalance', () => {
    it.each([
        ['', ''],
        ['0000', '00,00'],
        ['0028', '00,28'],
        ['4540', '45,40'],
        ['151', '15,10'],
        ['67', '67,00'],
        ['6', '60,00'],
        ['19884', '198,84'],
        ['547095', '5470,95'],
    ])(
        'should return the right formatted balance ("%s" -> "%s")',
        (balance, expected) => {
            const result = formatBalance(balance);
            expect(result).toBe(expected);
        },
    );
});
