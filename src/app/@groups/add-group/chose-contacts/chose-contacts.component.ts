import { Component, inject } from '@angular/core';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
import { FormService } from '@core/services/form/form.service';
import { map } from 'rxjs';
import { Persons } from '@core/model/person';
import { Router } from '@angular/router';

@Component({
    selector: 'chose-contacts',
    templateUrl: './chose-contacts.component.html',
    styleUrls: ['./chose-contacts.component.scss'],
    standalone: false,
})
export class ChoseContactsComponent {
    private contactService = inject(ContactServiceToken);
    private formService = inject(FormService);
    private form = this.formService.injectCurrentForm();
    private router = inject(Router);

    labels = { members: 'members' };

    $contacts = this.contactService
        .getContacts()
        .pipe(map((contacts) => this.filterNotAlreadyAdded(contacts)));

    onButtonClicked(persons: Persons): void {
        const notAlreadyAddedPersons = this.filterNotAlreadyAdded(persons);
        const members = this.form
            .getFieldFrom(this.labels.members)
            .getValue<Persons>();

        const newMembers = members.concat(notAlreadyAddedPersons);
        this.form.getFieldFrom(this.labels.members).setValue(newMembers);

        this.router.navigate(['groups', 'add', 'members']);
    }

    private filterNotAlreadyAdded(persons: Persons): Persons {
        const addedMembers = this.form
            .getFieldFrom(this.labels.members)
            .getValue<Persons>();

        return persons.filter((contact) =>
            addedMembers.every((member) => member.getId() !== contact.getId()),
        );
    }
}
