import { ContactV2 } from '@core/model/contact/v2/contact';
import { Expense } from './expense';
import { ExpenseMetadata } from './expense';

export class PairExpense extends Expense {
    constructor(
        metadata: ExpenseMetadata,
        private balance: string,
        private counterparty: ContactV2,
    ) {
        super(metadata);
    }

    getBalance(): string {
        return this.balance;
    }

    // todo: rename into getCounterparty()
    getOrigin(): ContactV2 {
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
