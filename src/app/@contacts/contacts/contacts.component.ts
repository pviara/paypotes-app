import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
import { DisplayedContacts } from '@core/model/contact/displayed-contacts';
import { Filters } from '@core/model/expense/filters';
import { Contacts } from '@core/model/contact/contact';

@Component({
    selector: 'contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
    private contactService = inject(ContactServiceToken);

    private nextIndex = 0;

    private savedFilters?: Filters;

    private skeletons: Array<null> = Array.from({ length: 20 }).map(() => null);

    $contacts = new BehaviorSubject<DisplayedContacts>([]);

    filtering = false;

    ngOnInit(): void {
        this.prepareList();
        this.getContacts();
    }

    onContactHovered(contactId: string): void {
        if (this.isContactNearListEnd(contactId)) {
            this.addSkeletonsToList();
            this.getNextPageContacts();
        }
    }

    onUpdatedFilters(filters: Filters): void {
        this.filtering = true;
        this.resetNextIndex();
        this.saveFilters(filters);
        this.prepareList();

        this.contactService
            .getContacts(this.nextIndex, filters)
            .subscribe((contacts) => {
                this.$contacts.next(contacts);
                this.filtering = false;
            });
    }

    private prepareList(): void {
        this.emptyList();
        this.addSkeletonsToList();
    }

    private addSkeletonsToList(): void {
        const newContacts = this.$contacts.getValue().concat(this.skeletons);
        this.$contacts.next(newContacts);
    }

    private getContacts(): void {
        this.contactService
            .getContacts(this.nextIndex, this.savedFilters)
            .subscribe(this.appendContactsToList());
    }

    private getNextPageContacts(): void {
        this.nextIndex++;
        this.getContacts();
    }

    private appendContactsToList(): (contacts: Contacts) => void {
        return (newContacts: Contacts) => {
            let contacts = this.$contacts
                .getValue()
                .filter((contact) => !!contact);
            contacts = contacts.concat(newContacts);
            this.$contacts.next(contacts);
        };
    }

    private isContactNearListEnd(contactId: string): boolean {
        const index = this.findContactIndexWith(contactId);
        const isNearArrayEnd = index > this.$contacts.getValue().length - 10;
        return isNearArrayEnd;
    }

    private findContactIndexWith(contactId: string): number {
        return this.$contacts
            .getValue()
            .findIndex((contact) => contact?.getId() === contactId);
    }

    private resetNextIndex(): void {
        this.nextIndex = 0;
    }

    private saveFilters(filters: Filters): void {
        this.savedFilters = filters;
    }

    private emptyList(): void {
        this.$contacts.next([]);
    }
}
