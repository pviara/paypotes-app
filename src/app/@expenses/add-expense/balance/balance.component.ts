import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { Component, input } from '@angular/core';
import { BalanceFormatter } from './balance-formatter';

type BalanceFormControl = AddExpenseForm['balance'];

@Component({
    selector: 'balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
    private formatter = new BalanceFormatter();

    balance = input.required<BalanceFormControl>();

    keyboard = this.formatter.getKeyboard();

    onKeyClicked(key: string): void {
        this.formatter.append(key);
        this.balance().setValue(this.formatter.getBalance());
    }
}
