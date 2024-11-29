import { BalanceFormatter } from './model/balance-formatter';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupBuilder } from '@core/model/form/form-group-builder';
import { FormServiceToken } from '@core/services/form/form.service.provider';
import { Router } from '@angular/router';

@Component({
    selector: 'set-balance',
    templateUrl: './set-balance.component.html',
    styleUrls: ['./set-balance.component.scss'],
})
export class SetBalanceComponent implements OnInit {
    private form = inject(FormServiceToken);
    private router = inject(Router);

    label = 'balance';
    formatter = new BalanceFormatter();
    formGroup!: FormGroup;

    ngOnInit(): void {
        if (this.form.exists(this.label)) {
            this.initFormGroup();
        } else {
            this.addFormField();
            this.initFormGroup();
        }
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

    private addFormField(): void {
        const VALID_BALANCE_REGEXP = /^(?:\d{1,2}|\d{1,2},\d{1,2})$/;
        this.form.addField({
            label: this.label,
            value: '',
            regexps: [VALID_BALANCE_REGEXP],
        });
    }

    private initFormGroup(): void {
        this.formGroup = new FormGroupBuilder(this.form).build();
    }
}
