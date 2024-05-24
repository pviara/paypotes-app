import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { DisplayedExpenses } from '@core/model/expense/displayed-expense';

@Component({
    selector: 'paginated-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
    private expenseService = inject(ExpenseServiceToken);

    private skeletons: Array<null> = Array.from({ length: 20 }).map(() => null);

    $expenses = new BehaviorSubject<DisplayedExpenses>([]);

    ngOnInit(): void {
        this.$expenses.next(this.skeletons);
        this.expenseService.expenses.subscribe((expenses) =>
            this.$expenses.next(expenses),
        );
    }

    onExpenseHovered(expenseId: string): void {
        let expenses = this.$expenses.getValue();

        const index = expenses.findIndex(
            (expense) => expense?.getId() === expenseId,
        );

        const isNearArrayEnd = index > expenses.length - 10;
        if (isNearArrayEnd) {
            expenses = expenses.concat(this.skeletons);
            this.$expenses.next(expenses);

            // todo: with pageIndex of course
            this.expenseService.expenses.subscribe((newExpenses) => {
                let expenses = this.$expenses
                    .getValue()
                    .filter((expense) => !!expense);
                expenses = expenses.concat(newExpenses);
                this.$expenses.next(expenses);
            });
        }
    }
}
