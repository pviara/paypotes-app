import { Emoji } from '@core/model/emoji';

export class Group {
    constructor(
        private readonly data: {
            readonly id: string;
            readonly name: string;
            readonly emoji: Emoji;
            readonly members: Array<unknown>;
            readonly balance: number;
        },
    ) {}

    countMembers(): number {
        return this.data.members.length;
    }

    formatBalance(): string {
        return `${Math.abs(this.getBalance()).toFixed(2).replace('.', ',')}€`;
    }

    getEmoji(): Emoji {
        return this.data.emoji;
    }

    getId(): string {
        return this.data.id;
    }

    getName(): string {
        return this.data.name;
    }

    isDebt(): boolean {
        return this.data.balance < 0;
    }

    private getBalance(): number {
        return this.data.balance / 100;
    }
}

export type Groups = Array<Group>;
