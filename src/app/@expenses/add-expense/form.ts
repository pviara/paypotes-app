type FieldInput = {
    label: string;
    value?: unknown;
    constraint?: RegExp;
};

export class Form {
    private fields = new Map<FieldInput['label'], FieldInput>();

    get(label: string): FieldInput | null {
        return this.fields.get(label) ?? null;
    }

    getFieldLabels(): Array<string> {
        return Array.from(this.fields.entries()).map(([key]) => key);
    }

    addField({ label, value, constraint }: FieldInput): void {
        this.throwIfInvalid(label);
        this.throwIfExists(label);
        this.fields.set(label, { label, value, constraint });
    }

    setField({ label, value }: FieldInput): void {
        this.throwIfNotFound(label);
        this.fields.set(label, { label, value });
        return;
    }

    valid(label: string): any {
        const field = this.fields.get(label);
        if (!field) throw new LabelNotFoundError(label);

        const { value, constraint } = field;
        return constraint ? constraint.test(`${value}`) : true;
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
