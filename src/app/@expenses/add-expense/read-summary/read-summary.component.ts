import { AddExpenseFormValue } from '@shared/components/summary-form/summary-form.component';
import { Component, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { NotificationService } from '@core/services/notification/notification.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
    selector: 'read-summary',
    templateUrl: './read-summary.component.html',
    styleUrls: ['./read-summary.component.scss'],
})
export class ReadSummaryComponent {
    private expenseService = inject(ExpenseServiceToken);
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    onButtonClicked(formValue: AddExpenseFormValue): void {
        this.expenseService
            .addPairExpense({
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
