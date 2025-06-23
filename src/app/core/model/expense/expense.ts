export type ExpenseMetadata = {
    id: string;
    label: string;
    emoji: string;
    createdAt: Date;
};

export class Expense {
    constructor(private metadata: ExpenseMetadata) {}

    getCreatedAt(): Date {
        return this.metadata.createdAt;
    }

    getEmoji(): string {
        return this.metadata.emoji;
    }

    getId(): string {
        return this.metadata.id;
    }

    getLabel(): string {
        return this.metadata.label;
    }
}
