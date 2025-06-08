import { Component, inject } from '@angular/core';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
import { Contacts, Contact } from '@core/model/contact/contact';
import { AddExpenseFormToken } from '@core/services/form/form.provider';
import { Member } from '@core/model/group/member';
import { Router } from '@angular/router';

@Component({
    selector: 'chose-contact',
    templateUrl: './chose-contact.component.html',
    styleUrls: ['./chose-contact.component.scss'],
})
export class ChoseContactComponent {
    private contactService = inject(ContactServiceToken);
    private form = inject(AddExpenseFormToken);
    private router = inject(Router);

    private label = 'person';

    $contacts = this.contactService.getContacts();

    isLastFrom(contacts: Contacts, index: number): boolean {
        return index === contacts.length - 1;
    }

    onPersonSelected(person: Contact | Member): void {
        this.form.getFieldFrom(this.label).setValue(person);
        this.router.navigate(['expenses', 'add', 'summary']);
    }
}
