import { Emoji } from '@core/model/emoji';

export class Expense {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly label: string;
            readonly emoji: Emoji;
            readonly balance: number;
            readonly origin: string;
        },
    ) {
        this.throwIfNil(data.balance);
    }

    formatBalance(): string {
        return `${Math.abs(this.getBalance()).toFixed(2).replace('.', ',')}€`;
    }

    getEmoji(): Emoji {
        return this.data.emoji;
    }

    getId(): string {
        return this.data.id;
    }

    getLabel(): string {
        return this.data.label;
    }

    getOrigin(): string {
        return this.data.origin;
    }

    getBalance(): number {
        return this.data.balance / 100;
    }

    isDebt(): boolean {
        return this.data.balance < 0;
    }

    private throwIfNil(balance: number): void {
        if (balance === 0) {
            throw new Error('Balance cannot be nil');
        }
    }
}

export type Expenses = Array<Expense>;
