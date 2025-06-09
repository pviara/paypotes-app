import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs';
import { NotificationService } from '@core/services/notification/notification.service';
import { GroupExpense } from '@core/model/expense/group-expense';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { generateRandomDate } from '@shared/utils/get-random-date';
import { Group } from '@core/model/group/group';
import { Member } from '@core/model/group/member';
import { generateRandomName } from '@shared/utils/generate-random-name';
import { getRandomAvatarUrl } from '@shared/utils/generate-random-avatar-url';

@Component({
    selector: 'group-expense',
    templateUrl: './group-expense.component.html',
    styleUrls: ['./group-expense.component.scss'],
})
export class GroupExpenseComponent {
    private expenseService = inject(ExpenseServiceToken);
    private notificationService = inject(NotificationService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private expenseId = '';
    private groupId = '';

    $expense = this.route.params.pipe(
        tap((params) => (this.expenseId = params['expenseId'])),
        switchMap(() => this.expenseService.getExpense(this.expenseId)),
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
        tap((expense) => (this.groupId = expense.getGroup().getId())),
        shareReplay(1),
    );

    $expenseLabel = this.$expense.pipe(map((expense) => expense.getLabel()));

    onPayback(): void {
        if (this.expenseId) {
            this.expenseService
                .paybackGroupExpense(this.groupId, this.expenseId)
                .pipe(
                    tap(this.notifyPaidBack()),
                    tap(this.redirectToExpenses()),
                )
                .subscribe();
        }
    }

    private notifyPaidBack(): () => void {
        return () =>
            this.notificationService.notify({
                type: 'success',
                message: 'Dépense remboursée !',
            });
    }

    private redirectToExpenses(): () => void {
        return () => this.router.navigate(['/expenses']);
    }
}
