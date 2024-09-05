import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
    ExpenseServiceProvider,
    ExpenseServiceToken,
} from '@core/services/expense/expense.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { NotificationService } from '@core/services/notification/notification.service';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { shareReplay, switchMap, tap } from 'rxjs';

@Component({
    selector: 'expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss'],
    providers: [
        ExpenseServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class ExpenseComponent {
    private expenseService = inject(ExpenseServiceToken);
    private notificationService = inject(NotificationService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private expenseId = '';

    $expense = this.route.params.pipe(
        tap((params) => (this.expenseId = params['expenseId'])),
        switchMap(() => this.expenseService.getExpense(this.expenseId)),
        shareReplay(1),
    );

    onPayback(): void {
        if (this.expenseId) {
            this.expenseService
                .payback(this.expenseId)
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
                message: 'Dépense remboursée',
            });
    }

    private redirectToExpenses(): () => void {
        return () => this.router.navigate(['/expenses']);
    }
}
