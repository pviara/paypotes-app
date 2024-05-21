import { Expense } from './expense';

describe('Expense', () => {
    it('should name the expense correctly', () => {
        const label = 'Cinéma';
        const sut = new Expense({
            id: '8911SPEA',
            label,
            emoji: '🎥',
            total: 800,
            origin: 'Claire',
        });

        expect(sut.getLabel()).toBe(label);
    });

    describe('total', () => {
        it('should throw an error when given total is nil', () => {
            const createExpenseWithNilTotal = () => {
                const total = 0;
                createExpenseWith({ total });
            };
            expect(createExpenseWithNilTotal).toThrow();
        });

        describe('formatTotal', () => {
            it('should return 1€ when given total was 100', () => {
                const sut = createExpenseWith({ total: 100 });

                expect(sut.formatTotal()).toBe('1,00€');
            });

            it('should return 10€ when given total was 1000', () => {
                const total = 1000;
                const sut = createExpenseWith({ total });

                expect(sut.formatTotal()).toBe('10,00€');
            });

            it('should return 0.5€ when given total was 50', () => {
                const sut = createExpenseWith({ total: 50 });

                expect(sut.formatTotal()).toBe('0,50€');
            });

            it('should return 1,10€ when given total was -110', () => {
                const sut = createExpenseWith({ total: -110 });

                expect(sut.formatTotal()).toBe('1,10€');
            });

            it('should return 19,37€ when given total was -1937', () => {
                const sut = createExpenseWith({ total: -1937 });

                expect(sut.formatTotal()).toBe('19,37€');
            });
        });
    });

    describe('isDebt', () => {
        it('should return true when given total is negative', () => {
            const sut = createExpenseWith({ total: -180 });
            expect(sut.isDebt()).toBe(true);
        });

        it('should return false when given total is positive', () => {
            const sut = createExpenseWith({ total: 2500 });
            expect(sut.isDebt()).toBe(false);
        });
    });
});

function createExpenseWith(data: { total: number }): Expense {
    return new Expense({
        id: '8911SPEA',
        label: 'Courses',
        emoji: '🛒',
        total: data.total,
        origin: 'Ahmed',
    });
}
