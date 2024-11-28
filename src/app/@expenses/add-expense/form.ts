type FieldInput = {
    label: string;
    value?: unknown;
    constraint?: RegExp;
};

type Label = string;

export class Form {
    private fields = new Map<Label, Field>();

    get(label: string): Field | null {
        return this.fields.get(label) ?? null;
    }

    getFieldLabels(): Array<string> {
        return Array.from(this.fields.entries()).map(([key]) => key);
    }

    addField({ label, value, constraint }: FieldInput): void {
        if (this.isInvalid(label)) {
            throw new InvalidLabelError(label);
        }
        if (this.exists(label)) {
            throw new LabelExistsError(label);
        }
        this.fields.set(label, new Field(value, constraint));
    }

    private exists(label: string) {
        return this.fields.has(label);
    }

    setField({ label, value }: FieldInput): void {
        const field = this.getStrict(label).setValue(value);
        this.fields.set(label, field);
    }

    valid(label: string): boolean {
        const field = this.getStrict(label);
        return field.valid();
    }

    private isInvalid(label: string): boolean {
        const onlyAlphabeticPattern = new RegExp(/^[a-zA-Z]+$/);
        return !onlyAlphabeticPattern.test(label);
    }

    private getStrict(label: string): Field {
        const field = this.get(label);
        if (field) return field;
        throw new LabelNotFoundError(label);
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

class Field {
    constructor(
        public value?: unknown,
        private constraint?: RegExp,
    ) {}

    setValue(value: unknown): this {
        this.value = value;
        return this;
    }

    valid(): boolean {
        return this.constraint ? this.constraint.test(`${this.value}`) : true;
    }
}
