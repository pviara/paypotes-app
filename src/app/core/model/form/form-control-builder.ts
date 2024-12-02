import { Field } from '@core/model/form/field';
import { FormControl, ValidatorFn } from '@angular/forms';

export class FormControlBuilder {
    constructor(private field: Field) {}

    build(): FormControl {
        return new FormControl(this.field.getValue(), [this.isControlValid()]);
    }

    private isControlValid(): ValidatorFn {
        return () => {
            const valid = this.field.valid();
            return valid ? null : { invalid: true };
        };
    }
}
