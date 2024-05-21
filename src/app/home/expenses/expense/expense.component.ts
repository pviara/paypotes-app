import { Component, input } from '@angular/core';
import { Expense } from '../../../core/model/expense/expense';

@Component({
    selector: 'expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent {
    expense = input.required<Expense>();
}
