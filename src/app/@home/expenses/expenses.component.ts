import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import {
    ExpenseServiceProvider,
    ExpenseServiceToken,
} from '@core/services/expense/expense.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { ListElements } from '@core/model/list-element/list-element';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';

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
export class ExpensesComponent implements OnInit {
    private expenseService = inject(ExpenseServiceToken);

    private skeletons: Array<null> = Array.from({ length: 6 }).map(() => null);

    $expenses = new BehaviorSubject<ListElements>([]);

    ngOnInit(): void {
        this.$expenses.next(this.skeletons);
        this.expenseService
            .getExpenses()
            .subscribe((expenses) => this.$expenses.next(expenses.slice(0, 6)));
    }
}
