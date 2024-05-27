import { BehaviorSubject } from 'rxjs';
import { Component, input } from '@angular/core';
import { DisplayedContacts } from '@core/model/contact/displayed-contacts';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent {
    $contacts = input.required<BehaviorSubject<DisplayedContacts>>();
}
