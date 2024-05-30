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

    private savedFilters?: Filters;

    private skeletons: Array<null> = Array.from({ length: 5 }).map(() => null);

    $contacts = new BehaviorSubject<DisplayedContacts>([]);

    filtering = false;

    ngOnInit(): void {
        this.prepareList();
        this.getExpenses();
    }

    onUpdatedFilters(filters: Filters): void {
        this.filtering = true;
        this.saveFilters(filters);
        this.prepareList();

        this.contactService.getContacts(filters).subscribe((contacts) => {
            this.$contacts.next(contacts);
            this.filtering = false;
        });
    }

    private prepareList(): void {
        this.emptyList();
        this.addSkeletonsToList();
    }

    private getExpenses(): void {
        this.contactService
            .getContacts(this.savedFilters)
            .subscribe((contacts) => this.$contacts.next(contacts));
    }

    private emptyList(): void {
        this.$contacts.next([]);
    }

    private addSkeletonsToList(): void {
        const newContacts = this.$contacts.getValue().concat(this.skeletons);
        this.$contacts.next(newContacts);
    }

    private saveFilters(filters: Filters): void {
        this.savedFilters = filters;
    }
}
