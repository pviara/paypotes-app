import { Component, inject } from '@angular/core';
import { BehaviorSubject, concat, of, tap } from 'rxjs';
import { GroupServiceToken } from '@core/services/group/group.service.provider';
import { Group } from '@core/model/group/group';

const SKELETON_ARRAY = Array.from({ length: 5 }).map(() => null);

@Component({
    selector: 'groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
    private groupService = inject(GroupServiceToken);

    private skeletons: Array<null> = Array.from({ length: 6 }).map(() => null);

    $groups = new BehaviorSubject<Array<Group | null>>([]);

    ngOnInit(): void {
        this.$groups.next(this.skeletons);
        this.groupService
            .getGroups()
            .subscribe((groups) => this.$groups.next(groups.slice(0, 6)));
    }
}
