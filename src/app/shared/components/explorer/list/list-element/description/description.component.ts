import { Component, input } from '@angular/core';
import { ListElement } from '@core/model/list-element/list-element';

@Component({
    selector: 'description',
    templateUrl: './description.component.html',
    standalone: false,
})
export class DescriptionComponent {
    element = input.required<ListElement>();
}
