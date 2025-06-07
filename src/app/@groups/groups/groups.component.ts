import { Action } from '@shared/components/headbar/action-button/action-button.component';
import { BehaviorSubject } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FiltersEvent } from '@core/model/filters/filters-event';
import { GroupServiceToken } from '@core/services/group/group.service.provider';
import { ListElements } from '@core/model/list-element/list-element';

@Component({
    selector: 'groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
    private groupService = inject(GroupServiceToken);

    action: Action = { char: '+', route: '/groups/add' };

    $groups = new BehaviorSubject<ListElements>([]);

    onGroupsRequested({ pageIndex, filters }: FiltersEvent): void {
        this.groupService
            .getGroupsWithBalance(pageIndex, filters)
            .subscribe((groups) => {
                console.log(groups);
                this.$groups.next(groups);
            });
    }
}
