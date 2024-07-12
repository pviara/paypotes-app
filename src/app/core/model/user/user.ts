export class User {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly firstname: string;
            readonly lastname: string;
            readonly avatarURL: string;
        },
    ) {}

    getId(): string {
        return this.data.id;
    }
}

export type Users = Array<User>;
