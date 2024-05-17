export class Group {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly name: string;
            readonly members: Array<unknown>;
        },
    ) {}

    countMembers(): number {
        return this.data.members.length;
    }

    getName(): string {
        return this.data.name;
    }
}

export type Groups = Array<Group>;
