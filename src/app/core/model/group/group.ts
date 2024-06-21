import { Emoji } from '@core/model/emoji';
import { Expense, Expenses } from '@core/model/expense/expense';

export class Group {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly name: string;
            readonly emoji: Emoji;
            readonly members: Array<unknown>;
            readonly balance: number;
            readonly expenses: Expenses;
        },
    ) {}

    countMembers(): number {
        return this.data.members.length;
    }

    formatBalance(): string {
        return `${Math.abs(this.getBalance()).toFixed(2).replace('.', ',')}€`;
    }

    getEmoji(): Emoji {
        return this.data.emoji;
    }

    getExpenses(): Expenses {
        return this.data.expenses;
    }

    getId(): string {
        return this.data.id;
    }

    getName(): string {
        return this.data.name;
    }

    isDebt(): boolean {
        return this.data.balance < 0;
    }

    private getBalance(): number {
        return this.data.balance / 100;
    }
}

export type Groups = Array<Group>;
