import { Emoji } from '@core/model/emoji';

export class Group {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly name: string;
            readonly emoji: Emoji;
            readonly members: Array<unknown>;
        },
    ) {}

    countMembers(): number {
        return this.data.members.length;
    }

    getEmoji(): Emoji {
        return this.data.emoji;
    }

    getName(): string {
        return this.data.name;
    }
}

export type Groups = Array<Group>;
