import { Component, inject } from '@angular/core';
import { concat, of, tap } from 'rxjs';
import { GroupServiceToken } from '../../core/services/group/group.service.provider';

const SKELETON_ARRAY = Array.from({ length: 5 }).map(() => null);

@Component({
    selector: 'groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
    private groupService = inject(GroupServiceToken);

    groups = concat(
        of(SKELETON_ARRAY),
        this.groupService.groups.pipe(tap(this.stopLoading())),
    );

    isLoading = true;

    private stopLoading(): () => void {
        return () => (this.isLoading = false);
    }
}
