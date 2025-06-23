import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { NotificationService } from '@core/services/notification/notification.service';
import { PairExpense } from '@core/model/expense/pair-expense';

@Component({
    selector: 'pair-expense',
    templateUrl: './pair-expense.component.html',
    styleUrls: ['./pair-expense.component.scss'],
})
export class PairExpenseComponent {
    private expenseService = inject(ExpenseServiceToken);
    private notificationService = inject(NotificationService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private expenseId = '';
    private contactId = '';

    $expense = this.route.params.pipe(
        tap((params) => (this.expenseId = params['expenseId'])),
        switchMap(() => this.expenseService.getExpense(this.expenseId)),
        catchError(() => this.router.navigate(['expenses'])),
        filter((expense) => expense instanceof PairExpense),
        tap((expense) => (this.contactId = expense.getCounterparty().getId())),
        shareReplay(1),
    );

    $expenseLabel = this.$expense.pipe(map((expense) => expense.getLabel()));

    onPayback(): void {
        if (this.expenseId) {
            this.expenseService
                .paybackPairExpense(this.contactId, this.expenseId)
                .pipe(
                    tap(this.notifyPaidBack()),
                    tap(this.redirectToExpenses()),
                )
                .subscribe();
        }
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
