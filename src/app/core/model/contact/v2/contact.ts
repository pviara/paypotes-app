export type ContactMetadata = {
    id: string;
    firstname: string;
    lastname: string;
    avatarUrl: string;
};

export class ContactV2 {
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

export type ContactsV2 = Array<ContactV2>;
