export class Form {
    private labels = new Set<string>();

    getFieldLabels(): Array<string> {
        return Array.from(this.labels.values());
    }

    setField(label: string): void {
        if (this.isInvalid(label)) {
            throw new InvalidLabelError(label);
        }
        this.add(label);
    }

    private isInvalid(label: string): boolean {
        const onlyAlphabeticPattern = new RegExp(/^[a-zA-Z]+$/);
        return !onlyAlphabeticPattern.test(label);
    }

    private add(label: string): void {
        if (this.labels.has(label)) {
            throw new LabelExistsError(label);
        }
        this.labels.add(label);
    }
}

export class InvalidLabelError extends Error {
    constructor(label: string) {
        super(`Given label "${label}" is invalid`);
    }
}

export class LabelExistsError extends Error {
    constructor(label: string) {
        super(`Given label "${label}" already exists`);
    }
}
