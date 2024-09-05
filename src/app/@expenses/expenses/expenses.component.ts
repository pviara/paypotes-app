import { BehaviorSubject } from 'rxjs';
import { Component, inject } from '@angular/core';
import {
    ExpenseServiceProvider,
    ExpenseServiceToken,
} from '@core/services/expense/expense.service.provider';
import { FiltersEvent } from '@core/model/filters/filters-event';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { ListElements } from '@core/model/list-element/list-element';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';

@Component({
    templateUrl: './expenses.component.html',
    providers: [
        ExpenseServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class ExpensesComponent {
    private expenseService = inject(ExpenseServiceToken);

    $expenses = new BehaviorSubject<ListElements>([]);

    onExpensesRequested({ pageIndex, filters }: FiltersEvent): void {
        this.expenseService
            .getExpenses(pageIndex, filters)
            .subscribe((expenses) => {
                this.$expenses.next(expenses);
            });
    }
}
