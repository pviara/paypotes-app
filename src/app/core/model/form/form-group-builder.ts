import { Field, Form } from './form';
import { FormControl, FormGroup } from '@angular/forms';
import { FormControlBuilder } from './form-control-builder';

type AnyForm = {
    [x: string]: FormControl<unknown>;
};

export class FormGroupBuilder {
    constructor(private form: Form) {}

    build(): FormGroup<AnyForm> {
        const entries = this.form.getFieldEntries().map(([label, field]) => {
            const control = this.buildControlFrom(field);
            return [label, control];
        });

        return new FormGroup(Object.fromEntries(entries));
    }

    private buildControlFrom(field: Field): FormControl {
        return new FormControlBuilder(field).build();
    }
}
