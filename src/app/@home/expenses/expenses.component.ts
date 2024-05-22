import { Component, inject } from '@angular/core';
import { concat, of, tap } from 'rxjs';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';

const SKELETON_ARRAY = Array.from({ length: 5 }).map(() => null);

@Component({
    selector: 'expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent {
    private expenseService = inject(ExpenseServiceToken);

    expenses = concat(
        of(SKELETON_ARRAY),
        this.expenseService.expenses.pipe(tap(this.stopLoading())),
    );

    isLoading = true;

    private stopLoading(): () => void {
        return () => (this.isLoading = false);
    }
}
