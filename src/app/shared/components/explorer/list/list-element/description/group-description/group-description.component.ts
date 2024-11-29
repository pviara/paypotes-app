import { Component, input } from '@angular/core';

@Component({
    selector: 'group-description',
    templateUrl: './group-description.component.html',
    styleUrls: ['./group-description.component.scss'],
})
export class GroupDescriptionComponent {
    emoji = input.required<string>();

    name = input.required<string>();

    membersCount = input.required<number>();
}
