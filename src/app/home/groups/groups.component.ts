import { Component, inject } from '@angular/core';
import { GroupAPIServiceToken } from '../../core/services/group/group.service.provider';
import { GroupService } from '../../core/services/group/group.service';

@Component({
    selector: 'groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
    private groupService = inject<GroupService>(GroupAPIServiceToken);

    groups = this.groupService.groups;
}
