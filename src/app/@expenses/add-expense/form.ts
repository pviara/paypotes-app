type FieldData = {
    label: string;
    value?: unknown;
    regexps?: Array<RegExp>;
};

type Label = string;

export class Form {
    private fields = new Map<Label, Field>();

    addField({ label, value, regexps: constraints }: FieldData): void {
        if (this.isInvalid(label)) {
            throw new InvalidLabelError(label);
        }
        if (this.exists(label)) {
            throw new LabelExistsError(label);
        }
        const field = this.createFieldFrom(value, constraints);
        this.fields.set(label, field);
    }

    getFieldFrom(label: string): Field {
        const field = this.fields.get(label);
        if (field) return field;
        throw new LabelNotFoundError(label);
    }

    setField({ label, value }: FieldData): void {
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

    private createFieldFrom(value: unknown, regexps?: Array<RegExp>): Field {
        const constraints = this.mapConstraintsFrom(regexps);
        return new Field(value, constraints);
    }

    private mapConstraintsFrom(
        regexps?: Array<RegExp>,
    ): Array<Constraint> | undefined {
        return regexps?.map((regexp) => new Constraint(regexp));
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
        private constraints: Array<Constraint> = [],
    ) {}

    getValue(): unknown {
        return this.value;
    }

    setValue(value: unknown): this {
        this.value = value;
        return this;
    }

    valid(): boolean {
        return this.constraints.every((constraint) => {
            const stringifiedValue = `${this.value}`;
            constraint.observedBy(stringifiedValue);
        });
    }
}

class Constraint {
    constructor(private regexp: RegExp) {}

    observedBy(value: string): boolean {
        return this.regexp.test(value);
    }
}
