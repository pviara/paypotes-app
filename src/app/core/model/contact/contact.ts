export class Contact {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly firstname: string;
            readonly lastname: string;
            readonly avatarURL: string;
            readonly balance: number;
        },
    ) {}

    formatBalance(): string {
        return `${Math.abs(this.getBalance()).toFixed(2).replace('.', ',')}€`;
    }

    getAvatarURL(): string {
        return this.data.avatarURL;
    }

    getFirstname(): string {
        return this.data.firstname;
    }

    getId(): string {
        return this.data.id;
    }

    getLastname(): string {
        return this.data.lastname;
    }

    isDebt(): boolean {
        return this.data.balance < 0;
    }

    private getBalance(): number {
        return this.data.balance / 100;
    }
}

export type Contacts = Array<Contact>;
