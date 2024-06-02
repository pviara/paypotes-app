import { BehaviorSubject } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
import { Filters } from '@core/model/expense/filters';
import { ListElements } from '@core/model/list-element/list-element';

@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
    private contactService = inject(ContactServiceToken);

    $contacts = new BehaviorSubject<ListElements>([]);

    onContactsRequested(event: {
        pageIndex?: number;
        filters?: Filters;
    }): void {
        this.contactService
            .getContacts(event.pageIndex, event.filters)
            .subscribe((contacts) => {
                this.$contacts.next(contacts);
            });
    }
}
