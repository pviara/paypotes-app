import { Action } from '@shared/components/headbar/action-button/action-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BehaviorSubject,
    catchError,
    filter,
    map,
    shareReplay,
    switchMap,
    tap,
} from 'rxjs';
import { Component, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { FiltersEvent } from '@core/model/filters/filters-event';
import { Group } from '@core/model/group/group';
import { GroupServiceToken } from '@core/services/group/group.service.provider';
import { ListElements } from '@core/model/list-element/list-element';

@Component({
    selector: 'group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
    private expenseService = inject(ExpenseServiceToken);
    private groupService = inject(GroupServiceToken);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private groupId = '';

    action: Action = {
        char: '+',
        route: `/groups/${this.getCurrentGroupId()}/add-expense/balance`,
    };

    $group = this.route.params.pipe(
        tap((params) => (this.groupId = params['groupId'])),
        switchMap(() => this.groupService.getGroup(this.groupId)),
        catchError(() => this.router.navigate(['groups'])),
        filter((group) => group instanceof Group),
        shareReplay(1),
    );

    $groupName = this.$group.pipe(map((group) => group.getName()));

    $expenses = new BehaviorSubject<ListElements>([]);

    onExpensesRequested({ pageIndex, filters }: FiltersEvent): void {
        this.expenseService
            .getGroupExpenses(this.groupId, pageIndex, filters)
            .subscribe((expenses) => {
                this.$expenses.next(expenses);
            });
    }

    private getCurrentGroupId(): string {
        return this.route.snapshot.params['groupId'];
    }
}
