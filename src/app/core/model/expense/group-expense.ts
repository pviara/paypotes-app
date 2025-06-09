import { Expense, ExpenseMetadata } from '@core/model/expense/expense';
import { Group } from '@core/model/group/group';
import { Member } from '@core/model/group/member';

export class GroupExpense extends Expense {
    constructor(
        metadata: ExpenseMetadata,
        private group: Group,
        private balance: string,
        private initialBalance: string,
    ) {
        super(metadata);
    }

    getBalance(): string {
        return this.balance;
    }

    getCreditor(): Member {
        return this.group.getMembers()[0];
    }

    getGroup() {
        return this.group;
    }

    getInitialBalance(): string {
        return this.initialBalance;
    }

    isDebt(): boolean {
        return this.getRawBalance() < 0;
    }

    private getRawBalance(): number {
        return +this.balance.replace(',', '.');
    }
}
