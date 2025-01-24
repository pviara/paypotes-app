import {
    InvalidValueTypeError,
    ValidatorDetails,
} from '@core/model/form/validator';

export type Validator = RegExp | ValidatorDetails;

export class Constraint {
    constructor(private validator: Validator) {}

    observedBy(value: unknown): boolean {
        if (this.validator instanceof RegExp) {
            if (this.canBeRegExpChecked(value)) {
                return this.validator.test(`${value}`);
            }
            throw new InvalidValueTypeError();
        } else {
            return this.validator.validate(value);
        }
    }

    private canBeRegExpChecked(value: unknown): boolean {
        return typeof value === 'string' || typeof value === 'number';
    }
}
