import { BehaviorSubject, tap } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { DisplayedExpenses } from '@core/model/expense/displayed-expense';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { Expenses } from '@core/model/expense/expense';

@Component({
    selector: 'paginated-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
    private nextIndex = 0;

    private expenseService = inject(ExpenseServiceToken);

    private lastScrollTop = 0;

    private skeletons: Array<null> = Array.from({ length: 20 }).map(() => null);

    $expenses = new BehaviorSubject<DisplayedExpenses>([]);

    ngOnInit(): void {
        this.initExpenses();
    }

    onExpenseHovered(expenseId: string): void {
        if (this.isExpenseNearListEnd(expenseId)) {
            this.addSkeletonsToList();
            this.getNextPageExpenses();
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

    private initExpenses(): void {
        this.$expenses.next(this.skeletons);
        this.expenseService
            .getExpenses({ pageIndex: this.nextIndex })
            .subscribe((expenses) => this.$expenses.next(expenses));
    }

    private addSkeletonsToList(): void {
        const newExpenses = this.$expenses.getValue().concat(this.skeletons);
        this.$expenses.next(newExpenses);
    }

    private getNextPageExpenses(): void {
        this.nextIndex++;
        this.expenseService
            .getExpenses({ pageIndex: this.nextIndex })
            .subscribe(this.appendExpensesToList());
    }

    private appendExpensesToList(): (expenses: Expenses) => void {
        return (newExpenses: Expenses) => {
            let expenses = this.$expenses
                .getValue()
                .filter((expense) => !!expense);
            expenses = expenses.concat(newExpenses);
            this.$expenses.next(expenses);
        };
    }

    private isExpenseNearListEnd(expenseId: string): boolean {
        const index = this.findExpenseIndexWith(expenseId);
        const isNearArrayEnd = index > this.$expenses.getValue().length - 10;
        return isNearArrayEnd;
    }

    private findExpenseIndexWith(expenseId: string): number {
        return this.$expenses
            .getValue()
            .findIndex((expense) => expense?.getId() === expenseId);
    }
}
