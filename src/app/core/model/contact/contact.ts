export type ContactMetadata = {
    id: string;
    firstname: string;
    lastname: string;
    avatarUrl: string;
};

export class Contact {
    constructor(private data: ContactMetadata) {}

    getAvatarURL(): string {
        return this.data.avatarUrl;
    }

    getFirstname(): string {
        return this.data.firstname;
    }

    getFullName(): string {
        return `${this.getFirstname()} ${this.getLastname()}`;
    }

    getId(): string {
        return this.data.id;
    }

    getLastname(): string {
        return this.data.lastname;
    }
}

export type Contacts = Array<Contact>;
