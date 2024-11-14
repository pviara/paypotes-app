import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '@core/model/contact/contact';
import {
    ContactServiceProvider,
    ContactServiceToken,
} from '@core/services/contact/contact.api-service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { AddExpenseFormService } from '../add-expense.form-service';

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
    private formService = inject(AddExpenseFormService);
    private router = inject(Router);

    $contacts = this.contactService.getContacts();

    isLastFrom(contacts: Contact[], index: number): boolean {
        return index === contacts.length - 1;
    }

    onContactSelected(contact: Contact): void {
        this.formService.setPerson(contact);
        this.router.navigate(['expenses', 'add', 'summary']);
    }
}
