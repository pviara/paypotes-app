import { Component, inject, OnInit } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { getValidator, ValidatorKey } from '@core/model/form/validator';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
import { FormServiceToken } from '@core/services/form/form.service.provider';
import { tap } from 'rxjs';

@Component({
    selector: 'chose-contacts',
    templateUrl: './chose-contacts.component.html',
    styleUrls: ['./chose-contacts.component.scss'],
})
export class ChoseContactsComponent implements OnInit {
    private contactService = inject(ContactServiceToken);
    form = inject(FormServiceToken);

    label = 'contacts';

    $contacts = this.contactService.getContacts();

    ngOnInit(): void {
        if (!this.form.exist(this.label)) {
            this.form.addField({
                label: this.label,
                value: [],
                validators: [getValidator(ValidatorKey.MinLengthOne)],
            });
        }
    }

    isLastFrom(contacts: Contact[], index: number): boolean {
        return index === contacts.length - 1;
    }
}
