export class Member {
    constructor(
        private data: {
            id: string;
            firstname: string;
            lastname: string;
            avatarUrl: string;
        },
    ) {}

    getAvatarUrl(): string {
        return this.data.avatarUrl;
    }

    getFirstname(): string {
        return this.data.firstname;
    }

    getFullName(): string {
        return `${this.data.firstname} ${this.data.lastname}`;
    }

    getId(): string {
        return this.data.id;
    }

    getLastname(): string {
        return this.data.lastname;
    }
}

export type Members = Array<Member>;
