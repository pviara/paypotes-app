import { AddExpenseFormService } from '../add-expense.form-service';
import { Component, inject } from '@angular/core';
import {
    ExpenseServiceProvider,
    ExpenseServiceToken,
} from '@core/services/expense/expense.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { NotificationService } from '@core/services/notification/notification.service';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

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
    private formService = inject(AddExpenseFormService);
    private expenseService = inject(ExpenseServiceToken);
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    addExpense(): void {
        const payload = this.formService.extractPayload();
        this.expenseService
            .addExpense(payload)
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

    getBalance(): string {
        return this.formService.balance || '';
    }

    getEmoji(): string {
        return this.formService.emoji || '';
    }

    getIsCurrentPayer(): boolean {
        return this.formService.isCurrentPayer;
    }

    getName(): string {
        return this.formService.name || '';
    }

    getPersonAvatarURL(): string {
        return this.formService.person?.getAvatarURL() || '';
    }

    getPersonFullname(): string {
        return this.formService.person?.getFullName() || '';
    }
}
