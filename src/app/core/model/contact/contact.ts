export class Contact {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly firstname: string;
            readonly lastname: string;
        },
    ) {}
}

export type Contacts = Array<Contact>;
