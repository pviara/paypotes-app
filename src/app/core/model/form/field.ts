import { Constraint } from '@core/model/form/constraint';

export class Field {
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
        return this.constraints.every((constraint) =>
            this.value ? constraint.observedBy(`${this.value}`) : false,
        );
    }
}
