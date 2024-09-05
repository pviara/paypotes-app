import { BehaviorSubject } from 'rxjs';
import { Component, inject } from '@angular/core';
import {
    ContactServiceProvider,
    ContactServiceToken,
} from '@core/services/contact/contact.api-service.provider';
import { FiltersEvent } from '@core/model/filters/filters-event';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { ListElements } from '@core/model/list-element/list-element';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';

@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    providers: [
        ContactServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
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
