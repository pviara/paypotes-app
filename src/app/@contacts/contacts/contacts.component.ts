import { BehaviorSubject } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
import { FiltersEvent } from '@core/model/filters/filters-event';
import { ListElements } from '@core/model/list-element/list-element';

@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
    private contactService = inject(ContactServiceToken);

    $contacts = new BehaviorSubject<ListElements>([]);

    onContactsRequested({ pageIndex, filters }: FiltersEvent): void {
        this.contactService
            .getContacts(pageIndex, filters)
            .subscribe((contacts) => {
                this.$contacts.next(contacts);
            });
    }
}
