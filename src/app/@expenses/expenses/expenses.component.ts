import { BehaviorSubject } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { Filters } from '@core/model/expense/filters';
import { ListElements } from '@core/model/list-element/list-element';

@Component({
    selector: 'paginated-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent {
    private expenseService = inject(ExpenseServiceToken);

    $expenses = new BehaviorSubject<ListElements>([]);

    onExpensesRequested(event: {
        pageIndex?: number;
        filters?: Filters;
    }): void {
        this.expenseService
            .getExpenses(event.pageIndex, event.filters)
            .subscribe((expenses) => {
                this.$expenses.next(expenses);
            });
    }
}
