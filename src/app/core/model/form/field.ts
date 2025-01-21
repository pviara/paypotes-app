import { Constraint } from '@core/model/form/constraint';

export class Field {
    constructor(
        private value?: unknown,
        private constraints: Array<Constraint> = [],
    ) {}

    invalid(): boolean {
        return !this.valid();
    }

    getValue<T>(): T {
        return this.value as T;
    }

    setValue(value: unknown): this {
        this.value = value;
        return this;
    }

    valid(): boolean {
        return this.constraints.every((constraint) =>
            this.valueCanBeChecked()
                ? constraint.observedBy(this.value)
                : false,
        );
    }

    private valueCanBeChecked(): boolean {
        const isNotDefined = this.value === null || this.value === undefined;
        const isEmptyString =
            typeof this.value === 'string' && this.value.length === 0;

        return isNotDefined || isEmptyString ? false : true;
    }
}
