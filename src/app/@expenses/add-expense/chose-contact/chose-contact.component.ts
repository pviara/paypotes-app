import { Component, inject } from '@angular/core';
import { Contacts } from '@core/model/contact/contact';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
import { FormService } from '@core/services/form/form.service';
import { Person } from '@core/model/person';
import { Router } from '@angular/router';

@Component({
    selector: 'chose-contact',
    templateUrl: './chose-contact.component.html',
    styleUrls: ['./chose-contact.component.scss'],
})
export class ChoseContactComponent {
    private contactService = inject(ContactServiceToken);
    private formService = inject(FormService);
    private form = this.formService.injectCurrentForm();
    private router = inject(Router);

    private label = 'person';

    $contacts = this.contactService.getContacts();

    isLastFrom(contacts: Contacts, index: number): boolean {
        return index === contacts.length - 1;
    }

    onPersonSelected(person: Person): void {
        this.form.getFieldFrom(this.label).setValue(person);
        this.router.navigate(['expenses', 'add', 'summary']);
    }
}
