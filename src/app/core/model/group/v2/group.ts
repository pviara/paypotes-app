import { Member } from "@core/model/group/v2/member";

export class Group {
    constructor(
        private data: {
            id: string,
            name: string,
            emoji: string,
            members: Array<Member>
        }
    ) {}

    countMembers(): number {
        return this.data.members.length;
    }

    getEmoji(): string {
        return this.data.emoji;
    }

    getId(): string {
        return this.data.id;
    }

    getName(): string {
        return this.data.name;
    }
}
