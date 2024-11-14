import { AddExpenseFormService } from '../add-expense.form-service';
import { BalanceFormatter } from './model/balance-formatter';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type SetBalanceForm = {
    balance: FormControl<string>;
};

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
        ]),
    });

    formatter = new BalanceFormatter();

    onButtonClicked(): void {
        if (this.form.controls.balance.valid) {
            this.router.navigate(['expenses', 'add', 'emoji']);
        }
    }

    onKeyClicked(key: string): void {
        this.formatter.append(key);

        const balance = this.formatter.getBalance();

        this.form.controls.balance.setValue(balance);
        this.formService.setBalance(balance);
    }
}
