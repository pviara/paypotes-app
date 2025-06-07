export class MemberV2 {
    constructor(
        private data: {
            id: string;
            firstname: string;
            lastname: string;
            avatarUrl: string;
        },
    ) {}

    getAvatarURL(): string {
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

export type MembersV2 = Array<MemberV2>;
