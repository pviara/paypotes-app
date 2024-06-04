import { Emoji } from '@core/model/emoji';
import { Contact } from '@core/model/contact/contact';

export class Expense {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly label: string;
            readonly date: Date;
            readonly emoji: Emoji;
            readonly balance: number;
            readonly origin: Contact;
        },
    ) {
        this.throwIfNil(data.balance);
    }

    formatBalance(): string {
        return `${Math.abs(this.getBalance()).toFixed(2).replace('.', ',')}€`;
    }

    getDate(): Date {
        return this.data.date;
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

    getOrigin(): Contact {
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
