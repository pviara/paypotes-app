import { Contact, ContactMetadata } from '@core/model/contact/contact';

export class ContactWithBalance extends Contact {
    constructor(
        metadata: ContactMetadata,
        private balance: string,
    ) {
        super(metadata);
    }

    getBalance(): string {
        return this.balance;
    }

    isDebt(): boolean {
        return this.getRawBalance() < 0;
    }

    private getRawBalance(): number {
        return +this.balance.replace(',', '.');
    }
}

export type ContactsWithBalance = Array<ContactWithBalance>;
