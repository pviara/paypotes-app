import { BalanceFormatter } from './model/balance-formatter';
import { Component, inject, OnInit } from '@angular/core';
import { Field } from '@core/model/form/form';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormControlBuilder } from '@core/model/form/form-control-builder';
import { FormServiceToken } from '@core/services/form/form.service.provider';
import { Router } from '@angular/router';

type SetBalanceForm = {
    [x: string]: FormControl<string>;
};

const VALID_BALANCE_REGEXP = /^(?:\d{1,2}|\d{1,2},\d{1,2})$/;

@Component({
    selector: 'set-balance',
    templateUrl: './set-balance.component.html',
    styleUrls: ['./set-balance.component.scss'],
})
export class SetBalanceComponent implements OnInit {
    private formBuilder = inject(FormBuilder);
    private form = inject(FormServiceToken);
    private router = inject(Router);

    label = 'balance';

    formatter = new BalanceFormatter();

    formGroup = this.formBuilder.group<SetBalanceForm>({});

    ngOnInit(): void {
        this.initForm();
    }

    onButtonClicked(): void {
        if (this.formGroup.controls[this.label].valid) {
            this.router.navigate(['expenses', 'add', 'emoji']);
        }
    }

    onKeyClicked(key: string): void {
        this.formatter.append(key);
        const balance = this.formatter.getBalance();

        this.form.setField({ label: this.label, value: balance });
        this.formGroup.controls[this.label].setValue(balance);
    }

    private initForm(): void {
        if (this.form.exists(this.label)) {
            const field = this.form.getFieldFrom(this.label);
            this.formatter.setBalance(`${field.getValue()}`);
            this.setFormControlFor(field);
        } else {
            const field = this.addFormField();
            this.setFormControlFor(field);
        }
    }

    private setFormControlFor(field: Field): void {
        const control = new FormControlBuilder(field).build();
        this.formGroup.setControl(this.label, control);
    }

    private addFormField(): Field {
        return this.form.addField({
            label: this.label,
            value: '',
            regexps: [VALID_BALANCE_REGEXP],
        });
    }
}
