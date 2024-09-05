import { BehaviorSubject } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FiltersEvent } from '@core/model/filters/filters-event';
import { GroupServiceProvider, GroupServiceToken } from '@core/services/group/group.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { ListElements } from '@core/model/list-element/list-element';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';

@Component({
    selector: 'groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
    providers: [
        GroupServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ]
})
export class GroupsComponent {
    private groupService = inject(GroupServiceToken);

    $groups = new BehaviorSubject<ListElements>([]);

    onGroupsRequested({ pageIndex, filters }: FiltersEvent): void {
        this.groupService.getGroups(pageIndex, filters).subscribe((groups) => {
            this.$groups.next(groups);
        });
    }
}
