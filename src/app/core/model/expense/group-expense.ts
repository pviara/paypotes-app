import { Expense, ExpenseMetadata } from '@core/model/expense/expense';
import { Group } from '@core/model/group/group';
import { Member } from '@core/model/group/member';

export type Credit = {
    balance: string;
    creditor: Member;
};

export class GroupExpense extends Expense {
    constructor(
        metadata: ExpenseMetadata,
        private group: Group,
        private credit: Credit,
        private balance: string,
    ) {
        super(metadata);
    }

    getBalance(): string {
        return this.balance;
    }

    getCredit(): string {
        return this.credit.balance;
    }

    getCreditor(): Member {
        return this.credit.creditor;
    }

    getGroup() {
        return this.group;
    }

    isDebt(): boolean {
        return this.getRawBalance() < 0;
    }

    private getRawBalance(): number {
        return +this.balance.replace(',', '.');
    }
}
