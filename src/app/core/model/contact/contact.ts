export class Contact {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly firstname: string;
            readonly lastname: string;
            readonly balance: number;
        },
    ) {}
}

export type Contacts = Array<Contact>;
