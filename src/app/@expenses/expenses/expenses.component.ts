import { Component, inject } from '@angular/core';
import { concat, of, tap } from 'rxjs';
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

    expenses = concat(
        of(SKELETON_ARRAY),
        // this.expenseService.expenses.pipe(tap(this.stopLoading())),
    );

    isLoading = true;

    options = [
        { label: 'Tout', value: 'all' },
        { label: 'Créances', value: 'claims' },
        { label: 'Dettes', value: 'debts' },
    ];

    selectedClassFor({ value }: Option): { [x: string]: boolean } {
        return { selected: false };
    }

    private stopLoading(): () => void {
        return () => (this.isLoading = false);
    }
}
