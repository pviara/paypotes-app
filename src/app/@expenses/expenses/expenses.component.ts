import { concat, tap } from 'rxjs';
import { Component, inject } from '@angular/core';
import { Expenses } from '@core/model/expense/expense';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';

type Option = { label: string; value: string };

const SKELETON_ARRAY = Array.from({ length: 15 }).map(() => null);

@Component({
    selector: 'paginated-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent {
    private expenseService = inject(ExpenseServiceToken);

    private lastExpenses: Expenses = [];

    expenses = concat(
        this.expenseService.expenses.pipe(
            tap(this.stopLoading()),
            tap(this.registerLastExpenses()),
        ),
    );

    isLoading = true;

    options = [
        { label: 'Tout', value: 'all' },
        { label: 'Créances', value: 'claims' },
        { label: 'Dettes', value: 'debts' },
    ];

    onExpenseHovered(expenseId: string): void {
        console.log('hovered:', expenseId);

        const index = this.lastExpenses.findIndex(
            (expense) => expense.getId() === expenseId,
        );
        const isNearArrayEnd = index > this.lastExpenses.length - 10;
        console.log('isNearArrayEnd', index, isNearArrayEnd);
    }

    selectedClassFor({ value }: Option): { [x: string]: boolean } {
        return { selected: false };
    }

    private stopLoading(): () => void {
        return () => (this.isLoading = false);
    }

    private registerLastExpenses(): (expenses: Expenses) => void {
        return (expenses: Expenses) => (this.lastExpenses = expenses);
    }
}
