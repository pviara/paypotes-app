import { Members } from '@core/model/group/member';

export type GroupMetadata = {
    id: string;
    name: string;
    emoji: string;
};

export type GroupRootData = {
    metadata: GroupMetadata;
    members: Members;
};

export class Group {
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

    getMembers(): Members {
        return this.data.members;
    }

    getMembersExcluding(memberId: string): Members {
        return this.data.members.filter(
            (member) => member.getId() !== memberId,
        );
    }

    getName(): string {
        return this.data.metadata.name;
    }
}

export type Groups = Array<Group>;
