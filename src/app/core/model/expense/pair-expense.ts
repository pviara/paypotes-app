import { Contact } from '@core/model/contact/contact';
import { Expense, ExpenseMetadata } from '@core/model/expense/expense';

export class PairExpense extends Expense {
    constructor(
        metadata: ExpenseMetadata,
        private balance: string,
        private counterparty: Contact,
    ) {
        super(metadata);
    }

    getBalance(): string {
        return this.balance;
    }

    getCounterparty(): Contact {
        return this.counterparty;
    }

    isDebt(): boolean {
        return this.getRawBalance() < 0;
    }

    private getRawBalance(): number {
        return +this.balance.replace(',', '.');
    }
}

export type PairExpenses = Array<PairExpense>;
