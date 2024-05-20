import { Emoji } from './emoji';

export class Expense {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly name: string;
            readonly emoji: Emoji;
            readonly amount: number;
        },
    ) {}

    getAmount(): number {
        return this.data.amount / 100;
    }

    getEmoji(): Emoji {
        return this.data.emoji;
    }

    getName(): string {
        return this.data.name;
    }
}

export type Expenses = Array<Expense>;
