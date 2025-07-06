import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { BehaviorSubject, tap } from 'rxjs';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ConfettiService } from '@core/services/confetti/confetti.service';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { FormService } from '@core/services/form/form.service';
import { GroupExpense } from '@core/model/expense/group-expense';
import { GroupExpenseViewService } from '@expenses/group-expense/group-expense.view-service';
import { NotificationService } from '@core/services/notification/notification.service';
import { Persons } from '@core/model/person';
import { Router } from '@angular/router';
import { Stakeholders } from '@core/model/expense/stakeholder';

@Component({
    selector: 'group-expense-chose-members',
    templateUrl: './group-expense-chose-members.component.html',
    styleUrls: ['./group-expense-chose-members.component.scss'],
})
export class GroupExpenseChoseMembersComponent {
    private authService = inject(AuthServiceToken);
    private confettiService = inject(ConfettiService);
    private expenseService = inject(ExpenseServiceToken);
    private formService = inject(FormService);
    private form = this.formService.injectCurrentForm();
    private groupExpenseViewService = inject(GroupExpenseViewService);
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    private expenseId = '';

    expense = this.groupExpenseViewService.$fetchedExpense.getValue();
    debtors = this.getExpenseActiveDebtors();

    $loading = new BehaviorSubject(false);

    @Output()
    buttonClicked = new EventEmitter<string[]>();

    getPreviousRoute(): string {
        return `/expenses/${this.expenseId}/group/detail`;
    }

    onButtonClicked(persons: Persons): void {
        this.$loading.next(true);
        this.confettiService.pan();

        const expense = this.getFetchedExpense();
        const personIds = persons.map((person) => person.getId());

        this.expenseService
            .paybackGroupExpense(
                expense.getGroup().getId(),
                expense.getId(),
                personIds,
            )
            .pipe(
                tap(this.notifyPaidBack(personIds)),
                tap(this.redirectToGroupExpenses()),
                tap(() => this.form.clear()),
            )
            .subscribe();
    }

    private getExpenseActiveDebtors(): Stakeholders {
        return (
            this.expense
                ?.getStakeholdersExcluding(this.authService.actor.getId())
                .filter((stakeholder) => stakeholder.isActive()) || []
        );
    }

    private notifyPaidBack(personIds: Array<string>): () => void {
        return () =>
            this.notificationService.notify({
                type: 'success',
                message:
                    personIds.length < this.debtors.length
                        ? 'Dépense partiellement remboursée !'
                        : 'Dépense remboursée !',
            });
    }

    private redirectToGroupExpenses(): () => void {
        return () =>
            this.router.navigate(['/groups', this.expense?.getGroup().getId()]);
    }

    private getFetchedExpense(): GroupExpense {
        const expense = this.groupExpenseViewService.$fetchedExpense.getValue();

        if (expense) return expense;
        throw new Error(
            'Expense has not been fetched and thus component cannot work',
        );
    }
}
