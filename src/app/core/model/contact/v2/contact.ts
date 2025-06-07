export type ContactMetadata = {
    id: string;
    name: string;
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

    getLastname(): string {
        return this.data.lastname;
    }
}
