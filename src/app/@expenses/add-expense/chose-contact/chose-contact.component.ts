import { Component, inject, InjectionToken } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import {
    ContactServiceProvider,
    ContactServiceToken,
} from '@core/services/contact/contact.api-service.provider';
import { AddExpenseFormToken } from '@core/services/form/form.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { Router } from '@angular/router';

@Component({
    selector: 'chose-contact',
    templateUrl: './chose-contact.component.html',
    styleUrls: ['./chose-contact.component.scss'],
    providers: [
        ContactServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class ChoseContactComponent {
    private contactService = inject(ContactServiceToken);
    private form = inject(AddExpenseFormToken);
    private router = inject(Router);

    private label = 'person';

    $contacts = this.contactService.getContacts();

    isLastFrom(contacts: Contact[], index: number): boolean {
        return index === contacts.length - 1;
    }

    onContactSelected(contact: Contact): void {
        this.form.getFieldFrom(this.label).setValue(contact);
        this.router.navigate(['expenses', 'add', 'summary']);
    }
}
