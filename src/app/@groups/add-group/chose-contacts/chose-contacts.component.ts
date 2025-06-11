import { Component, inject } from '@angular/core';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
import { FormService } from '@core/services/form/form.service';
import { Persons } from '@core/model/person';
import { Router } from '@angular/router';

@Component({
    selector: 'chose-contacts',
    templateUrl: './chose-contacts.component.html',
    styleUrls: ['./chose-contacts.component.scss'],
})
export class ChoseContactsComponent {
    private contactService = inject(ContactServiceToken);
    private formService = inject(FormService);
    private form = this.formService.injectCurrentForm();
    private router = inject(Router);

    labels = { members: 'members' };

    $contacts = this.contactService.getContacts();

    onButtonClicked(persons: Persons): void {
        const notAlreadyAddedPersons = this.filterNotAlreadyAdded(persons);
        this.form
            .getFieldFrom(this.labels.members)
            .setValue(notAlreadyAddedPersons);

        this.router.navigate(['groups', 'add', 'members']);
    }

    private filterNotAlreadyAdded(persons: Persons): Persons {
        const addedMembers = this.form
            .getFieldFrom(this.labels.members)
            .getValue<Persons>();

        const notAlreadyAddedContacts = persons.filter((contact) =>
            addedMembers.every((member) => member.getId() !== contact.getId()),
        );
        return addedMembers.concat(notAlreadyAddedContacts);
    }
}
