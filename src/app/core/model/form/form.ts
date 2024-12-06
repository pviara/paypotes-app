import { Constraint, Validator } from '@core/model/form/constraint';
import { Field } from '@core/model/form/field';

type FieldData = {
    label: string;
    value?: unknown;
    validators?: Array<Validator>;
};

type Label = string;

export type LabeledField = {
    label: Label;
    field: Field;
};

export class Form {
    fields = new Map<Label, Field>();

    addField({ label, value, validators }: FieldData): void {
        if (this.labelInvalid(label)) {
            throw new InvalidLabelError(label);
        }
        if (this.exist(label)) {
            throw new LabelExistsError(label);
        }
        const field = this.createFieldFrom(value, validators);
        this.fields.set(label, field);
    }

    exist(...labels: Array<Label>) {
        return labels.every((label) => this.fields.has(label));
    }

    getFieldFrom(label: string): Field {
        const field = this.fields.get(label);
        if (field) return field;
        throw new LabelNotFoundError(label);
    }

    getFieldEntries(): Array<[Label, Field]> {
        return Array.from(this.fields.entries());
    }

    invalid(): boolean {
        return this.getFieldEntries()
            .map(this.mapEntryToField())
            .some((field) => field.invalid());
    }

    raw(): Record<Label, any> {
        const entries = this.getFieldEntries().map(([label, field]) => [
            label,
            field.getValue(),
        ]);
        return Object.fromEntries(entries);
    }

    setField({ label, value }: FieldData): void {
        const field = this.getFieldFrom(label).setValue(value);
        this.fields.set(label, field);
    }

    valid(label: string): boolean {
        const field = this.getFieldFrom(label);
        return field.valid();
    }

    private labelInvalid(label: string): boolean {
        const onlyAlphabeticPattern = new RegExp(/^[a-zA-Z]+$/);
        return !onlyAlphabeticPattern.test(label);
    }

    private createFieldFrom(
        value: unknown,
        validators?: Array<Validator>,
    ): Field {
        const constraints = this.mapConstraintsFrom(validators);
        return new Field(value, constraints);
    }

    private mapConstraintsFrom(
        validators?: Array<Validator>,
    ): Array<Constraint> | undefined {
        return validators?.map((validator) => new Constraint(validator));
    }

    private mapEntryToField(): (entry: [Label, Field]) => Field {
        return ([, field]) => field;
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
