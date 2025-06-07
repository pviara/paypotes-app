import { MembersV2 } from '@core/model/group/v2/member';

export type GroupMetadata = {
    id: string;
    name: string;
    emoji: string;
};

export type GroupRootData = {
    metadata: GroupMetadata;
    members: MembersV2;
};

export class GroupV2 {
    constructor(private data: GroupRootData) {}

    countMembers(): number {
        return this.data.members.length;
    }

    getEmoji(): string {
        return this.data.metadata.emoji;
    }

    getId(): string {
        return this.data.metadata.id;
    }

    getMembers(): MembersV2 {
        return this.data.members;
    }

    getName(): string {
        return this.data.metadata.name;
    }
}

export type GroupsV2 = Array<GroupV2>;
