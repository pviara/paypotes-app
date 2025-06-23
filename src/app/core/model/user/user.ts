export class User {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly firstname: string;
            readonly lastname: string;
            readonly avatarUrl: string;
        },
    ) {}

    getAvatarUrl(): string {
        return this.data.avatarUrl;
    }

    getFullName(): string {
        return `${this.data.firstname} ${this.data.lastname}`;
    }

    getFirstname(): string {
        return this.data.firstname;
    }

    getLastname(): string {
        return this.data.lastname;
    }

    getId(): string {
        return this.data.id;
    }
}

export type Users = Array<User>;
