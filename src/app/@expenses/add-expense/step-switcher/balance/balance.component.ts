import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { BalanceFormatter } from '@expenses/add-expense/step-switcher/balance/model/balance-formatter';
import { Component, computed, input } from '@angular/core';

type BalanceFormControl = AddExpenseForm['balance'];

@Component({
    selector: 'balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
    balance = input.required<BalanceFormControl>();

    formatter = new BalanceFormatter();

    onKeyClicked(key: string): void {
        this.formatter.append(key);
        this.balance().setValue(this.formatter.getBalance());
    }
}
