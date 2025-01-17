import { Component, inject } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import {
    ExpenseServiceProvider,
    ExpenseServiceToken,
} from '@core/services/expense/expense.service.provider';
import {
    AddExpenseFormServiceToken,
    AddGroupExpenseFormServiceToken,
} from '@core/services/form/form.service.provider';
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
    private form = inject(AddGroupExpenseFormServiceToken);
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    loading = false;

    addExpense(): void {
        this.changeLoadingStatus();
        const payload = this.form.raw();
        this.expenseService
            .addExpense({
                balance: payload['balance'],
                emoji: payload['emoji'],
                isCurrentPayer: payload['isCurrentPayer'],
                name: payload['name'],
                userId: payload['member'].getId(),
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

    getBalance(): string {
        return (this.form.getFieldFrom('balance').getValue() as string) || '';
    }

    getEmoji(): string {
        return (this.form.getFieldFrom('emoji').getValue() as string) || '';
    }

    getIsCurrentPayer(): boolean {
        return this.form.getFieldFrom('isCurrentPayer').getValue() as boolean;
    }

    getName(): string {
        return (this.form.getFieldFrom('name').getValue() as string) || '';
    }

    getMemberAvatarURL(): string {
        const member = this.form.getFieldFrom('member').getValue();
        if (member instanceof User) {
            return member.getAvatarURL();
        } else if (member instanceof Contact) {
            return member.getAvatarURL();
        }
        return '';
    }

    getMemberFullname(): string {
        const person = this.form.getFieldFrom('member').getValue();
        if (person instanceof User) {
            return person.getFullName();
        } else if (person instanceof Contact) {
            return person.getFullName();
        }
        return '';
    }

    private changeLoadingStatus(): void {
        this.loading = !this.loading;
    }
}
