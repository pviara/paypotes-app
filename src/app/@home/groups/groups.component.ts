import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group } from '@core/model/group/group';
import {
    GroupServiceProvider,
    GroupServiceToken,
} from '@core/services/group/group.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';

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

    private skeletons: Array<null> = Array.from({ length: 6 }).map(() => null);

    $groups = new BehaviorSubject<Array<Group | null>>([]);

    $noExpense = new BehaviorSubject<boolean>(true);

    ngOnInit(): void {
        this.$groups.next(this.skeletons);
        this.groupService
            .getGroups()
            .subscribe((groups) => this.$groups.next(groups.slice(0, 6)));
    }
}
