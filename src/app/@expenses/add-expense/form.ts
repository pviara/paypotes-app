type FieldInput = { label: string; value?: unknown };

export class Form {
    private fields = new Map<string, unknown>();

    get(label: string): unknown {
        return this.fields.get(label);
    }

    getFieldLabels(): Array<string> {
        return Array.from(this.fields.entries()).map(([key]) => key);
    }

    addField({ label, value }: FieldInput): void {
        this.throwIfInvalid(label);
        this.throwIfExists(label);
        this.fields.set(label, value);
    }

    setField({ label, value }: FieldInput): void {
        this.throwIfNotFound(label);
        this.fields.set(label, value);
        return;
    }

    private throwIfInvalid(label: string): void {
        if (this.isInvalid(label)) {
            throw new InvalidLabelError(label);
        }
    }

    private isInvalid(label: string): boolean {
        const onlyAlphabeticPattern = new RegExp(/^[a-zA-Z]+$/);
        return !onlyAlphabeticPattern.test(label);
    }

    private throwIfExists(label: string): void {
        if (this.fields.has(label)) {
            throw new LabelExistsError(label);
        }
    }

    private throwIfNotFound(label: string): void {
        if (!this.fields.has(label)) {
            throw new LabelNotFoundError(label);
        }
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

export class LabelNotFoundError extends Error {
    constructor(label: string) {
        super(`Given label "${label}" does not exist`);
    }
}
