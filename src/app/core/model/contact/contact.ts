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

    getAvatarURL(): string {
        return this.data.avatarURL;
    }

    getBalance(): number {
        return this.data.balance;
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
}

export type Contacts = Array<Contact>;
