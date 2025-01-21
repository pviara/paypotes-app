import {
    AddExpenseFormValue,
    AddGroupExpenseFormValue,
} from '@shared/components/summary-form/summary-form.component';
import { Component, inject } from '@angular/core';
import {
    ExpenseServiceProvider,
    ExpenseServiceToken,
} from '@core/services/expense/expense.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { NotificationService } from '@core/services/notification/notification.service';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { Router } from '@angular/router';

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
        if (this.isGroupExpenseFormValue(formValue)) {
            console.log('group expense form value', formValue);
            // this.expenseService.addGroupExpense(...)
        }
    }

    private isGroupExpenseFormValue(
        formValue: Record<string, any>,
    ): formValue is AddGroupExpenseFormValue {
        return !!formValue['groupId'];
    }
}
