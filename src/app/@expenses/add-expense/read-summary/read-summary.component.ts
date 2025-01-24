import { AddExpenseFormValue } from '@shared/components/summary-form/summary-form.component';
import { Component, inject } from '@angular/core';
import {
    ExpenseServiceProvider,
    ExpenseServiceToken,
} from '@core/services/expense/expense.service.provider';
import { AddExpenseFormToken } from '@core/services/form/form.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { NotificationService } from '@core/services/notification/notification.service';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '@core/model/user/user';

@Component({
    selector: 'read-summary',
    templateUrl: './read-summary.component.html',
    styleUrls: ['./read-summary.component.scss'],
    providers: [
        ExpenseServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class ReadSummaryComponent {
    private expenseService = inject(ExpenseServiceToken);
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    onButtonClicked(formValue: AddExpenseFormValue): void {
        this.expenseService
            .addExpense({
                balance: formValue.balance,
                emoji: formValue.emoji,
                isCurrentPayer: formValue.isCurrentPayer,
                name: formValue.name,
                userId: formValue.userId,
            })
            .pipe(
                tap(() => {
                    this.notificationService.notify({
                        type: 'success',
                        message: 'Dépense ajoutée !',
                    });
                    this.router.navigate(['/expenses']);
                }),
            )
            .subscribe();
    }
}
