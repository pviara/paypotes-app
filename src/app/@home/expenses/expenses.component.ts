import { BehaviorSubject, concat, map, of, tap } from 'rxjs';
import { Component, inject } from '@angular/core';
import {
    ExpenseServiceProvider,
    ExpenseServiceToken,
} from '@core/services/expense/expense.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { PairExpenses } from '@core/model/expense/pair-expense';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { GroupExpenses } from '@core/model/expense/group-expense';

const MAX_EXPENSES = 6;

@Component({
    selector: 'expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
    providers: [
        ExpenseServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class ExpensesComponent {
    private expenseService = inject(ExpenseServiceToken);

    private skeletons = Array.from({ length: MAX_EXPENSES }).map(() => null);

    $expenses = concat(
        of(this.skeletons),
        this.expenseService
            .getExpenses()
            .pipe(
                map(this.takeFewExpenses()),
                tap(this.displayCallToActionIfNeeded()),
            ),
    );

    $noExpense = new BehaviorSubject<boolean>(false);

    private takeFewExpenses(): (
        expenses: GroupExpenses | PairExpenses,
    ) => GroupExpenses | PairExpenses {
        return (expenses) => expenses.slice(0, MAX_EXPENSES);
    }

    private displayCallToActionIfNeeded(): (
        expenses: GroupExpenses | PairExpenses,
    ) => void {
        return (expenses) => {
            if (expenses.length === 0) this.$noExpense.next(true);
        };
    }
}
