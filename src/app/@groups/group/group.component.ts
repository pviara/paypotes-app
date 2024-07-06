import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, delay, shareReplay, switchMap, tap } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { FiltersEvent } from '@core/model/filters/filters-event';
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

    private groupId = '';

    $group = this.route.params.pipe(
        tap((params) => (this.groupId = params['groupId'])),
        switchMap(() => this.groupService.getGroup(this.groupId)),
        shareReplay(1),
    );

    $expenses = new BehaviorSubject<ListElements>([]);

    onExpensesRequested({ pageIndex, filters }: FiltersEvent): void {
        this.expenseService
            .getGroupExpenses(this.groupId, pageIndex, filters)
            .subscribe((expenses) => {
                this.$expenses.next(expenses);
            });
    }
}
