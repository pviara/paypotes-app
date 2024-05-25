import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { DisplayedExpenses } from '@core/model/expense/displayed-expense';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';

@Component({
    selector: 'paginated-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
    private expenseService = inject(ExpenseServiceToken);

    private lastScrollTop = 0;

    private skeletons: Array<null> = Array.from({ length: 20 }).map(() => null);

    $expenses = new BehaviorSubject<DisplayedExpenses>([]);

    ngOnInit(): void {
        this.$expenses.next(this.skeletons);
        this.expenseService
            .getExpenses()
            .subscribe((expenses) => this.$expenses.next(expenses));
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
            this.expenseService.getExpenses().subscribe((newExpenses) => {
                let expenses = this.$expenses
                    .getValue()
                    .filter((expense) => !!expense);
                expenses = expenses.concat(newExpenses);
                this.$expenses.next(expenses);
            });
        }
    }

    onScroll(event: Event): void {
        const element = event.target as HTMLElement;
        element.classList.remove('scroll-top', 'scroll-bottom');

        if (element.scrollTop >= this.lastScrollTop) {
            const className = 'scroll-top';
            element.classList.add(className);
            setTimeout(() => element.classList.remove(className), 500);
        } else {
            const className = 'scroll-bottom';
            element.classList.add(className);
            setTimeout(() => element.classList.remove(className), 500);
        }

        this.lastScrollTop = element.scrollTop;
    }
}
