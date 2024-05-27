import { Component } from '@angular/core';
import { Filters } from '@core/model/expense/filters';

@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
    filtering = false;

    onUpdatedFilters(filters: Filters): void {
        console.log(filters);
    }
}
