import { Component, input } from '@angular/core';
import { GroupV2 } from '@core/model/group/v2/group';

@Component({
    selector: 'group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
    group = input<GroupV2 | null>();

    getGroupRoute(): string {
        return `/groups/${this.group()?.getId()}`;
    }
}
