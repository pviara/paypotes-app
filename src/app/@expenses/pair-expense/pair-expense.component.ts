import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs';
import { Component, inject } from '@angular/core';
import { Expense } from '@core/model/expense/expense';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { NotificationService } from '@core/services/notification/notification.service';
import { PairExpense } from '@core/model/expense/pair-expense';

@Component({
    selector: 'pair-expense',
    templateUrl: './pair-expense.component.html',
    styleUrls: ['./pair-expense.component.scss'],
    standalone: false,
})
export class PairExpenseComponent {
    private expenseService = inject(ExpenseServiceToken);
    private notificationService = inject(NotificationService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private contactId = '';
    private expenseId = '';

    $expense = this.route.params.pipe(
        switchMap((params) =>
            this.expenseService.getExpense(params['expenseId']),
        ),
        tap(this.redirectIfNotPairExpense()),
        catchError(() => this.router.navigate(['expenses'])),
        filter((expense) => expense instanceof PairExpense),
        tap((expense) => {
            this.contactId = expense.getCounterparty().getId();
            this.expenseId = expense.getId();
        }),
        shareReplay(1),
    );

    $expenseLabel = this.$expense.pipe(map((expense) => expense.getLabel()));

    onPayback(): void {
        this.expenseService
            .paybackPairExpense(this.contactId, this.expenseId)
            .pipe(tap(this.notifyPaidBack()), tap(this.redirectToExpenses()))
            .subscribe();
    }

    private redirectIfNotPairExpense(): (expense: Expense) => void {
        return (expense: Expense) => {
            if (!(expense instanceof PairExpense))
                this.router.navigate(['/expenses']);
        };
    }

    private notifyPaidBack(): () => void {
        return () =>
            this.notificationService.notify({
                type: 'success',
                message: 'Dépense remboursée !',
            });
    }

    private redirectToExpenses(): () => void {
        return () => this.router.navigate(['/expenses']);
    }
}
