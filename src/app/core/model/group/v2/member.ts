export class Member {
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