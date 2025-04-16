import { Component, input } from '@angular/core';
import { Group } from '@core/model/group/group';

@Component({
    selector: 'group-call-to-action',
    templateUrl: './group-call-to-action.component.html',
    styleUrls: ['./group-call-to-action.component.scss'],
})
export class GroupCallToActionComponent {
    group = input<Group | null>();

    getGroupRoute(): string {
        return `/groups/${this.group()?.getId()}`;
    }
}
