import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { DisplayedExpenses } from '@core/model/expense/displayed-expense';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';

@Component({
    selector: 'recent-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
    private expenseService = inject(ExpenseServiceToken);

    private skeletons: Array<null> = Array.from({ length: 6 }).map(() => null);

    $expenses = new BehaviorSubject<DisplayedExpenses>([]);

    ngOnInit(): void {
        this.$expenses.next(this.skeletons);
        this.expenseService.getExpenses().subscribe((expenses) =>
            this.$expenses.next(expenses.slice(0, 6)),
        );
    }
}
