import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { switchMap } from 'rxjs';

@Component({
    selector: 'expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent {
    private expenseService = inject(ExpenseServiceToken);
    private route = inject(ActivatedRoute);

    $expense = this.route.params.pipe(
        switchMap((params) =>
            this.expenseService.getExpense(params['expenseId']),
        ),
    );
}
