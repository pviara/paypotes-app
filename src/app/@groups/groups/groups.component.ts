import { BehaviorSubject, tap } from 'rxjs';
import { Component, inject } from '@angular/core';
import { Filters } from '@core/model/expense/filters';
import { GroupServiceToken } from '@core/services/group/group.service.provider';
import { ListElements } from '@core/model/list-element/list-element';

@Component({
    selector: 'groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
    private groupService = inject(GroupServiceToken);

    $groups = new BehaviorSubject<ListElements>([]);

    onGroupsRequested(event: { pageIndex?: number; filters?: Filters }): void {
        this.groupService
            .getGroups(event.pageIndex, event.filters)
            .subscribe((groups) => {
                this.$groups.next(groups);
            });
    }
}
