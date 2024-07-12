import { Component, input } from '@angular/core';
import { Emoji } from '@core/model/emoji';

@Component({
    selector: 'group-description',
    host: { collisionId: 'picker-group-description' },
    templateUrl: './group-description.component.html',
    styleUrls: ['./group-description.component.scss'],
})
export class GroupDescriptionComponent {
    emoji = input.required<Emoji>();

    name = input.required<string>();

    membersCount = input.required<number>();
}
