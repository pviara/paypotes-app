import { AddExpenseFormService } from '../add-expense.form-service';
import { BalanceFormatter } from '@expenses/add-expense/step-switcher/balance/model/balance-formatter';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type SetBalanceForm = {
    balance: FormControl<string>;
};

const BALANCE_FORMAT_PATTERN = /^0$|^[1-9]\d{0,2}(?:,\d{1,2})?$/;

@Component({
    selector: 'set-balance',
    templateUrl: './set-balance.component.html',
    styleUrls: ['./set-balance.component.scss'],
})
export class SetBalanceComponent {
    private formBuilder = inject(FormBuilder);
    private formService = inject(AddExpenseFormService);
    private router = inject(Router);

    form = this.formBuilder.group<SetBalanceForm>({
        balance: this.formBuilder.nonNullable.control('', [
            Validators.required,
            Validators.minLength(1),
            Validators.pattern(BALANCE_FORMAT_PATTERN),
        ]),
    });

    formatter = new BalanceFormatter();

    onButtonClicked(): void {
        if (this.form.controls.balance.valid) {
            this.router.navigate(['add-expense', 'emoji']);
        }
    }

    onKeyClicked(key: string): void {
        this.formatter.append(key);

        const balance = this.formatter.getBalance();

        this.form.controls.balance.setValue(balance);
        this.formService.setBalance(balance);
    }
}
