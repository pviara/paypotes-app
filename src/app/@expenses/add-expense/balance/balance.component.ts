import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { Component, input } from '@angular/core';

type BalanceFormControl = AddExpenseForm['balance'];

@Component({
    selector: 'balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
    balance = input.required<BalanceFormControl>();
}
