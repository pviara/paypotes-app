import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ConfettiService } from '@core/services/confetti/confetti.service';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { NotificationService } from '@core/services/notification/notification.service';
import { GroupExpense } from '@core/model/expense/group-expense';
import { GroupExpenseViewService } from '../group-expense.view-service';

@Component({
    selector: 'group-expense-detail',
    templateUrl: './group-expense-detail.component.html',
    styleUrls: ['./group-expense-detail.component.scss'],
})
export class GroupExpenseDetailComponent {
    private confettiService = inject(ConfettiService);
    private expenseService = inject(ExpenseServiceToken);
    private groupExpenseViewService = inject(GroupExpenseViewService);
    private notificationService = inject(NotificationService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    $expense = this.route.params.pipe(
        map((params) => params['expenseId']),
        switchMap((expenseId) => this.expenseService.getExpense(expenseId)),
        catchError(() => this.router.navigate(['expenses'])),
        filter((expense) => expense instanceof GroupExpense),
        tap((expense) =>
            this.groupExpenseViewService.$fetchedExpense.next(expense),
        ),
        shareReplay(1),
    );

    $expenseLabel = this.$expense.pipe(map((expense) => expense.getLabel()));

    onPayback(): void {
        const expense = this.getFetchedExpense();
        if (expense) {
            this.confettiService.pan();
            this.expenseService
                .paybackGroupExpense(
                    expense.getGroup().getId(),
                    expense.getId(),
                    [],
                )
                .pipe(
                    tap(this.notifyPaidBack()),
                    tap(this.redirectToGroupExpenses()),
                )
                .subscribe();
        }
    }

    openPaybackDetails(): void {
        const expense = this.getFetchedExpense();
        this.router.navigate([
            'expenses',
            'group',
            expense?.getId(),
            'members',
        ]);
    }

    private notifyPaidBack(): () => void {
        return () =>
            this.notificationService.notify({
                type: 'success',
                message: 'Dépense remboursée !',
            });
    }

    private redirectToGroupExpenses(): () => void {
        const expense = this.getFetchedExpense();
        return () =>
            this.router.navigate(['/groups', expense.getGroup().getId()]);
    }

    private getFetchedExpense(): GroupExpense {
        const expense = this.groupExpenseViewService.$fetchedExpense.getValue();

        if (expense) return expense;
        throw new Error(
            'Expense has not been fetched and thus component cannot work',
        );
    }
}
