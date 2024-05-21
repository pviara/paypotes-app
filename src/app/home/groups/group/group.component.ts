import { Component, input } from '@angular/core';
import { Group } from '../../../core/model/group/group';

@Component({
    selector: 'group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
    group = input.required<Group>();
}
