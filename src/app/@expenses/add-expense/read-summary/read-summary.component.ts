import { AddExpenseFormValue } from '@shared/components/summary-form/summary-form.component';
import { Component, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { NotificationService } from '@core/services/notification/notification.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { FormService } from '@core/services/form/form.service';

@Component({
    selector: 'read-summary',
    templateUrl: './read-summary.component.html',
    styleUrls: ['./read-summary.component.scss'],
    standalone: false,
})
export class ReadSummaryComponent {
    private expenseService = inject(ExpenseServiceToken);
    private formService = inject(FormService);
    private form = this.formService.injectCurrentForm();
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    onButtonClicked(formValue: AddExpenseFormValue): void {
        this.expenseService
            .addPairExpense({
                balance: formValue.balance,
                emoji: formValue.emoji,
                isCurrentPayer: formValue.isCurrentPayer,
                label: formValue.name,
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
                tap(() => this.form.clear()),
            )
            .subscribe();
    }
}
