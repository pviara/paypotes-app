export type ExpenseMetadata = {
    id: string;
    label: string;
    emoji: string;
    date: Date;
};

export class Expense {
    constructor(private metadata: ExpenseMetadata) {}

    getDate(): Date {
        return this.metadata.date;
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
