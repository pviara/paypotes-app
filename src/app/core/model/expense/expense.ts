import { Contact } from '@core/model/contact/contact';

export class Expense {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly label: string;
            readonly date: Date;
            readonly emoji: string;
            readonly balance: number;
            readonly origin: Contact;
        },
    ) {
        this.throwIfNil(data.balance);
    }

    formatBalance(): string {
        return `${Math.abs(this.getRawBalance()).toFixed(2).replace('.', ',')}€`;
    }

    getDate(): Date {
        return this.data.date;
    }

    getEmoji(): string {
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

    getRawBalance(): number {
        return this.data.balance / 100;
    }

    getBalance(): string {
        return '';
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
