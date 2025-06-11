import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { GroupExpenseViewService } from '@expenses/group-expense/group-expense.view-service';
import { NotificationService } from '@core/services/notification/notification.service';
import { Persons } from '@core/model/person';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { GroupExpense } from '@core/model/expense/group-expense';
import { ConfettiService } from '@core/services/confetti/confetti.service';

@Component({
    selector: 'group-expense-chose-members',
    templateUrl: './group-expense-chose-members.component.html',
    styleUrls: ['./group-expense-chose-members.component.scss'],
})
export class GroupExpenseChoseMembersComponent {
    private confettiService = inject(ConfettiService);
    private expenseService = inject(ExpenseServiceToken);
    private groupExpenseViewService = inject(GroupExpenseViewService);
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    private expenseId = '';

    expense = this.groupExpenseViewService.$fetchedExpense.getValue();
    members = this.expense?.getGroup()?.getMembers() ?? [];

    @Output()
    buttonClicked = new EventEmitter<string[]>();

    getPreviousRoute(): string {
        return `/expenses/${this.expenseId}/group/detail`;
    }

    onButtonClicked(persons: Persons): void {
        const personIds = persons.map((person) => person.getId());
        const expense = this.getFetchedExpense();
        this.expenseService
            .paybackGroupExpense(
                expense.getGroup().getId(),
                expense.getId(),
                personIds,
            )
            .pipe(
                tap(this.notifyPaidBack()),
                tap(this.redirectToGroupExpenses()),
                tap(() => this.confettiService.pan()),
            )
            .subscribe();
    }

    private notifyPaidBack(): () => void {
        return () =>
            this.notificationService.notify({
                type: 'success',
                message: 'Dépense remboursée !',
            });
    }

    private redirectToGroupExpenses(): () => void {
        return () => this.router.navigate(['/expenses']);
    }

    private getFetchedExpense(): GroupExpense {
        const expense = this.groupExpenseViewService.$fetchedExpense.getValue();

        if (expense) return expense;
        throw new Error(
            'Expense has not been fetched and thus component cannot work',
        );
    }
}
