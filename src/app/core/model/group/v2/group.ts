import { MemberV2 } from "@core/model/group/v2/member";

export class GroupV2 {
    constructor(
        private data: {
            id: string,
            name: string,
            emoji: string,
            members: Array<MemberV2>
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

export type GroupsV2 = Array<GroupV2>;
