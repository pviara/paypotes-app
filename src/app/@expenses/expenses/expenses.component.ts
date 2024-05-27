import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { DisplayedExpenses } from '@core/model/expense/displayed-expense';
import { Expenses } from '@core/model/expense/expense';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { Filters } from '@core/model/expense/filters';

@Component({
    selector: 'paginated-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
    private expenseService = inject(ExpenseServiceToken);

    private nextIndex = 0;

    private savedFilters?: Filters;

    private skeletons: Array<null> = Array.from({ length: 20 }).map(() => null);

    $expenses = new BehaviorSubject<DisplayedExpenses>([]);

    filtering = false;

    ngOnInit(): void {
        this.prepareList();
        this.getExpenses();
    }

    onExpenseHovered(expenseId: string): void {
        if (this.isExpenseNearListEnd(expenseId)) {
            this.addSkeletonsToList();
            this.getNextPageExpenses();
        }
    }

    onUpdatedFilters(filters: Filters): void {
        this.filtering = true;
        this.resetNextIndex();
        this.saveFilters(filters);
        this.prepareList();

        this.expenseService
            .getExpenses(this.nextIndex, filters)
            .subscribe((expenses) => {
                this.$expenses.next(expenses);
                this.filtering = false;
            });
    }

    private prepareList(): void {
        this.emptyList();
        this.addSkeletonsToList();
    }

    private addSkeletonsToList(): void {
        const newExpenses = this.$expenses.getValue().concat(this.skeletons);
        this.$expenses.next(newExpenses);
    }

    private getExpenses(): void {
        this.expenseService
            .getExpenses(this.nextIndex, this.savedFilters)
            .subscribe(this.appendExpensesToList());
    }

    private getNextPageExpenses(): void {
        this.nextIndex++;
        this.getExpenses();
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

    private resetNextIndex(): void {
        this.nextIndex = 0;
    }

    private saveFilters(filters: Filters): void {
        this.savedFilters = filters;
    }

    private emptyList(): void {
        this.$expenses.next([]);
    }
}
