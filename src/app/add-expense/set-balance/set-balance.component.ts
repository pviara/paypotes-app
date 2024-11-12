import { BalanceFormatter } from '@expenses/add-expense/step-switcher/balance/model/balance-formatter';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddExpenseViewService } from '../add-expense.view-service';

type SetBalanceForm = {
    balance: FormControl<string>;
};

@Component({
    selector: 'set-balance',
    templateUrl: './set-balance.component.html',
    styleUrls: ['./set-balance.component.scss'],
})
export class SetBalanceComponent {
    private addExpenseViewService = inject(AddExpenseViewService);
    private formBuilder = inject(FormBuilder);

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

    onKeyClicked(key: unknown): void {
        if (typeof key === 'string') {
            this.formatter.append(key);

            const balance = this.formatter.getBalance();

            this.form.controls.balance.setValue(balance);
            this.addExpenseViewService.setBalance(balance);
        }
    }
}
