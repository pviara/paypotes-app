import { BalanceFormatter } from '@shared/components/set-balance/model/balance-formatter';
import { Component, inject, OnInit } from '@angular/core';
import { FormService } from '@core/services/form/form.service';
import { Form } from '@core/model/form/form';
import { Router } from '@angular/router';

@Component({
    selector: 'set-balance',
    templateUrl: './set-balance.component.html',
    styleUrls: ['./set-balance.component.scss'],
})
export class SetBalanceComponent implements OnInit {
    private formService = inject(FormService);
    private router = inject(Router);

    form = this.injectCurrentForm();

    label = 'balance';
    formatter = new BalanceFormatter();

    ngOnInit(): void {
        if (!this.form.exist(this.label)) {
            this.addFormField();
        }
    }

    onButtonClicked(): void {
        if (this.form.valid(this.label)) {
            this.router.navigate(['expenses', 'add', 'emoji']);
        }
    }

    onKeyClicked(key: string): void {
        this.formatter.append(key);
        const balance = this.formatter.getBalance();

        this.form.setField({ label: this.label, value: balance });
    }

    private injectCurrentForm(): Form {
        const currentFormToken = this.formService.getUsedForm();
        return inject(currentFormToken);
    }

    private addFormField(): void {
        const VALID_BALANCE_RANGE_REGEXP = /^(?:\d{1,2}|\d{1,2},\d{1,2})$/;
        this.form.addField({
            label: this.label,
            value: '',
            validators: [VALID_BALANCE_RANGE_REGEXP],
        });
    }
}
