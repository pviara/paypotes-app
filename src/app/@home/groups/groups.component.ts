import { BehaviorSubject, concat, map, of, tap } from 'rxjs';
import { Component, inject } from '@angular/core';
import {
    GroupServiceProvider,
    GroupServiceToken,
} from '@core/services/group/group.service.provider';
import { Groups } from '@core/model/group/group';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';

const MAX_GROUPS = 6;

@Component({
    selector: 'groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
    providers: [
        GroupServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class GroupsComponent {
    private groupService = inject(GroupServiceToken);

    private skeletons = Array.from({ length: MAX_GROUPS }).map(() => null);

    $groups = concat(
        of(this.skeletons),
        this.groupService
            .getGroups()
            .pipe(
                map(this.takeFewGroups()),
                tap(this.displayCallToActionIfNeeded()),
            ),
    );

    $noGroup = new BehaviorSubject<boolean>(false);

    private takeFewGroups(): (groups: Groups) => Groups {
        return (groups) => groups.slice(0, MAX_GROUPS);
    }

    private displayCallToActionIfNeeded(): (groups: Groups) => void {
        return (groups) => {
            if (groups.length === 0) this.$noGroup.next(true);
        };
    }
}
