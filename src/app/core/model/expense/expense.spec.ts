import { Expense } from './expense';

describe('Expense', () => {
    it('should name the expense correctly', () => {
        const label = 'Cinéma';
        const sut = new Expense({
            id: '8911SPEA',
            label,
            emoji: '🎥',
            balance: 800,
            origin: 'Claire',
        });

        expect(sut.getLabel()).toBe(label);
    });

    describe('balance', () => {
        it('should throw an error when given balance is nil', () => {
            const createExpenseWithNilbalance = () => {
                const balance = 0;
                createExpenseWith({ balance });
            };
            expect(createExpenseWithNilbalance).toThrow();
        });

        describe('formatBalance', () => {
            it('should return 1€ when given balance was 100', () => {
                const sut = createExpenseWith({ balance: 100 });

                expect(sut.formatBalance()).toBe('1,00€');
            });

            it('should return 10€ when given balance was 1000', () => {
                const balance = 1000;
                const sut = createExpenseWith({ balance });

                expect(sut.formatBalance()).toBe('10,00€');
            });

            it('should return 0.5€ when given balance was 50', () => {
                const sut = createExpenseWith({ balance: 50 });

                expect(sut.formatBalance()).toBe('0,50€');
            });

            it('should return 1,10€ when given balance was -110', () => {
                const sut = createExpenseWith({ balance: -110 });

                expect(sut.formatBalance()).toBe('1,10€');
            });

            it('should return 19,37€ when given balance was -1937', () => {
                const sut = createExpenseWith({ balance: -1937 });

                expect(sut.formatBalance()).toBe('19,37€');
            });
        });
    });

    describe('isDebt', () => {
        it('should return true when given balance is negative', () => {
            const sut = createExpenseWith({ balance: -180 });
            expect(sut.isDebt()).toBe(true);
        });

        it('should return false when given balance is positive', () => {
            const sut = createExpenseWith({ balance: 2500 });
            expect(sut.isDebt()).toBe(false);
        });
    });
});

function createExpenseWith(data: { balance: number }): Expense {
    return new Expense({
        id: '8911SPEA',
        label: 'Courses',
        emoji: '🛒',
        balance: data.balance,
        origin: 'Ahmed',
    });
}
