import { ActivatedRoute, Router } from '@angular/router';
import {
    AddExpenseFormValue,
    AddGroupExpenseFormValue,
} from '@shared/components/summary-form/summary-form.component';
import { Component, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { FormService } from '@core/services/form/form.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { tap } from 'rxjs';

@Component({
    selector: 'read-summary',
    templateUrl: './read-summary.component.html',
    styleUrls: ['./read-summary.component.scss'],
})
export class ReadSummaryComponent {
    private expenseService = inject(ExpenseServiceToken);
    private formService = inject(FormService);
    private form = this.formService.injectCurrentForm();
    private notificationService = inject(NotificationService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    getPreviousRoute(): string {
        const groupId = this.getCurrentGroupId();
        return `/groups/${groupId}/add-expense/details`;
    }

    onButtonClicked(formValue: AddExpenseFormValue): void {
        if (this.isGroupExpenseFormValue(formValue)) {
            this.expenseService
                .addGroupExpense({
                    balance: formValue.balance,
                    emoji: formValue.emoji,
                    label: formValue.name,
                    groupId: formValue.groupId,
                    memberId: formValue.userId,
                })
                .pipe(
                    tap(() => {
                        this.notificationService.notify({
                            type: 'success',
                            message: 'Dépense de groupe ajoutée !',
                        });
                        this.router.navigate([
                            'groups',
                            this.getCurrentGroupId(),
                        ]);
                    }),
                    tap(() => this.form.clear()),
                )
                .subscribe();
        }
    }

    private getCurrentGroupId(): string {
        return this.route.snapshot.params['groupId'];
    }

    private isGroupExpenseFormValue(
        formValue: Record<string, any>,
    ): formValue is AddGroupExpenseFormValue {
        return !!formValue['groupId'];
    }
}
