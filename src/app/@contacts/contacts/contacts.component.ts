import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
import { DisplayedContacts } from '@core/model/contact/displayed-contacts';
import { Filters } from '@core/model/expense/filters';

@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
    private contactService = inject(ContactServiceToken);

    private skeletons: Array<null> = Array.from({ length: 5 }).map(() => null);

    $contacts = new BehaviorSubject<DisplayedContacts>([]);

    filtering = false;

    ngOnInit(): void {
        this.prepareList();
    }

    onUpdatedFilters(filters: Filters): void {
        console.log(filters);
    }

    private prepareList(): void {
        this.emptyList();
        this.addSkeletonsToList();
    }

    private emptyList(): void {
        this.$contacts.next([]);
    }

    private addSkeletonsToList(): void {
        const newContacts = this.$contacts.getValue().concat(this.skeletons);
        this.$contacts.next(newContacts);
    }
}
