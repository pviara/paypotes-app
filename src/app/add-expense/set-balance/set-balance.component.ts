import { AddExpenseFormService } from '../add-expense.form-service';
import { BalanceFormatter } from '@expenses/add-expense/step-switcher/balance/model/balance-formatter';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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

    form = this.formBuilder.group<SetBalanceForm>({
        balance: this.formBuilder.nonNullable.control('', [
            Validators.required,
            Validators.minLength(1),
        ]),
    });

    formatter = new BalanceFormatter();

    onButtonClicked(): void {
        console.log('clicked');
    }

    onKeyClicked(key: string): void {
        this.formatter.append(key);

        const balance = this.formatter.getBalance();

        this.form.controls.balance.setValue(balance);
        this.formService.setBalance(balance);
    }
}
