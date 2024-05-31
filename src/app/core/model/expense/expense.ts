import { Emoji } from '@core/model/emoji';

export class Expense {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly label: string;
            readonly emoji: Emoji;
            readonly total: number;
            readonly origin: string;
        },
    ) {
        this.throwIfNil(data.total);
    }

    formatTotal(): string {
        return `${Math.abs(this.getTotal()).toFixed(2).replace('.', ',')}€`;
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

    getTotal(): number {
        return this.data.total / 100;
    }

    isDebt(): boolean {
        return this.data.total < 0;
    }

    private throwIfNil(total: number): void {
        if (total === 0) {
            throw new Error('Total cannot be nil');
        }
    }
}

export type Expenses = Array<Expense>;
