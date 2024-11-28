type FieldInput = {
    label: string;
    value?: unknown;
    constraint?: RegExp;
};

type Label = string;

export class Form {
    private fields = new Map<Label, Field>();

    addField({ label, value, constraint }: FieldInput): void {
        if (this.isInvalid(label)) {
            throw new InvalidLabelError(label);
        }
        if (this.exists(label)) {
            throw new LabelExistsError(label);
        }
        this.fields.set(label, new Field(value, constraint));
    }

    getFieldFrom(label: string): Field {
        const field = this.fields.get(label);
        if (field) return field;
        throw new LabelNotFoundError(label);
    }

    setField({ label, value }: FieldInput): void {
        const field = this.getFieldFrom(label).setValue(value);
        this.fields.set(label, field);
    }

    valid(label: string): boolean {
        const field = this.getFieldFrom(label);
        return field.valid();
    }

    private isInvalid(label: string): boolean {
        const onlyAlphabeticPattern = new RegExp(/^[a-zA-Z]+$/);
        return !onlyAlphabeticPattern.test(label);
    }

    private exists(label: string) {
        return this.fields.has(label);
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
        private value?: unknown,
        private constraint?: RegExp,
    ) {}

    getValue(): unknown {
        return this.value;
    }

    setValue(value: unknown): this {
        this.value = value;
        return this;
    }

    valid(): boolean {
        return this.constraint ? this.constraint.test(`${this.value}`) : true;
    }
}
