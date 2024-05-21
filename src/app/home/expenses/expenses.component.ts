import { Component, inject } from '@angular/core';
import { ExpenseServiceToken } from '../../core/services/expense/expense.service.provider';

@Component({
    selector: 'expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent {
    private expenseService = inject(ExpenseServiceToken);

    expenses = this.expenseService.expenses;
}
