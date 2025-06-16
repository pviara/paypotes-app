import { Action } from '@shared/components/headbar/action-button/action-button.component';
import { BehaviorSubject } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { FiltersEvent } from '@core/model/filters/filters-event';
import { ListElements } from '@core/model/list-element/list-element';

@Component({
    templateUrl: './expenses.component.html',
})
export class ExpensesComponent {
    private expenseService = inject(ExpenseServiceToken);

    action: Action = { char: '+', route: '/expenses/add/balance' };

    $expenses = new BehaviorSubject<ListElements>([]);

    onExpensesRequested({ pageIndex, filters }: FiltersEvent): void {
        this.expenseService
            .getExpenses(pageIndex, filters)
            .subscribe((expenses) => {
                this.$expenses.next(expenses);
            });
    }
}
