import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs';
import { NotificationService } from '@core/services/notification/notification.service';
import { GroupExpense } from '@core/model/expense/group-expense';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { generateRandomDate } from '@shared/utils/get-random-date';
import { Group } from '@core/model/group/group';
import { GroupExpenseViewService } from '../group-expense.view-service';
import { Member } from '@core/model/group/member';
import { generateRandomName } from '@shared/utils/generate-random-name';
import { getRandomAvatarUrl } from '@shared/utils/generate-random-avatar-url';
import { ConfettiService } from '@core/services/confetti/confetti.service';

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
        map(
            () =>
                new GroupExpense(
                    {
                        id: generateRandomString(),
                        date: generateRandomDate(),
                        emoji: '⛽',
                        label: 'Essence',
                    },
                    new Group({
                        metadata: {
                            id: generateRandomString(),
                            emoji: '🌊',
                            name: 'Bretagne',
                        },
                        members: [
                            new Member({
                                id: generateRandomString(),
                                firstname: generateRandomName().firstname,
                                lastname: generateRandomName().lastname,
                                avatarUrl: getRandomAvatarUrl(),
                            }),
                            new Member({
                                id: generateRandomString(),
                                firstname: generateRandomName().firstname,
                                lastname: generateRandomName().lastname,
                                avatarUrl: getRandomAvatarUrl(),
                            }),
                            new Member({
                                id: generateRandomString(),
                                firstname: generateRandomName().firstname,
                                lastname: generateRandomName().lastname,
                                avatarUrl: getRandomAvatarUrl(),
                            }),
                            new Member({
                                id: generateRandomString(),
                                firstname: generateRandomName().firstname,
                                lastname: generateRandomName().lastname,
                                avatarUrl: getRandomAvatarUrl(),
                            }),
                        ],
                    }),
                    {
                        balance: '100,00',
                        creditor: new Member({
                            id: generateRandomString(),
                            firstname: generateRandomName().firstname,
                            lastname: generateRandomName().lastname,
                            avatarUrl: getRandomAvatarUrl(),
                        }),
                    },
                    '75,00',
                ),
        ),
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
            this.expenseService
                .paybackGroupExpense(
                    expense.getGroup().getId(),
                    expense.getId(),
                    [],
                )
                .pipe(
                    tap(this.notifyPaidBack()),
                    tap(this.redirectToGroupExpenses()),
                    tap(() => this.confettiService.pan()),
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
        return () => this.router.navigate(['/groups', '']);
    }

    private getFetchedExpense(): GroupExpense {
        const expense = this.groupExpenseViewService.$fetchedExpense.getValue();

        if (expense) return expense;
        throw new Error(
            'Expense has not been fetched and thus component cannot work',
        );
    }
}
