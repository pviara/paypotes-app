import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { ListElements } from '@core/model/list-element/list-element';

@Component({
    selector: 'expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
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
