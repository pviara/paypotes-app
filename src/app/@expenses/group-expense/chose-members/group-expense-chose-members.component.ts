import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupExpense } from '@core/model/expense/group-expense';
import { Group } from '@core/model/group/group';
import { Member } from '@core/model/group/member';
import { Persons } from '@core/model/person';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { GroupServiceToken } from '@core/services/group/group.service.provider';
import { getRandomAvatarUrl } from '@shared/utils/generate-random-avatar-url';
import { generateRandomName } from '@shared/utils/generate-random-name';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { generateRandomDate } from '@shared/utils/get-random-date';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs';

@Component({
    selector: 'group-expense-chose-members',
    templateUrl: './group-expense-chose-members.component.html',
    styleUrls: ['./group-expense-chose-members.component.scss'],
})
export class GroupExpenseChoseMembersComponent {
    private expenseService = inject(ExpenseServiceToken);
    private groupService = inject(GroupServiceToken);
    private route = inject(ActivatedRoute);

    private expenseId = '';

    members = this.groupService.getLastFetchedGroup()?.getMembers() ?? [];

    // todo: add a service shared between this component and detail component, to share the same expense
    $expense = this.route.params.pipe(
        map((params) => (this.expenseId = params['expenseId'])),
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
        tap((expense) => (this.members = expense.getGroup().getMembers())),
        shareReplay(1),
    );

    @Output()
    buttonClicked = new EventEmitter<string[]>();

    getPreviousRoute(): string {
        return `/expenses/${this.expenseId}/group/detail`;
    }

    onButtonClicked(persons: Persons): void {
        const personIds = persons.map((person) => person.getId());
        this.buttonClicked.emit(personIds);
    }
}
