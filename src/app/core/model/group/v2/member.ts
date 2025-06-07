export class MemberV2 {
    constructor(
        private data: {
            id: string,
            firstname: string,
            lastname: string,
        }
    ) {}

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

export type MembersV2 = Array<MemberV2>;