import { ContactV2, ContactMetadata } from './contact';

export class ContactWithBalanceV2 extends ContactV2 {
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

export type ContactsWithBalanceV2 = Array<ContactWithBalanceV2>;
