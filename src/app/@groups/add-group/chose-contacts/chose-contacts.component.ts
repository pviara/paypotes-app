import { AddGroupFormToken } from '@core/services/form/form.provider';
import { Component, inject, OnInit } from '@angular/core';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
import { ContactsV2, ContactV2 } from '@core/model/contact/v2/contact';
import { getValidator, ValidatorKey } from '@core/model/form/validator';
import { Router } from '@angular/router';
import { User } from '@core/model/user/user';

@Component({
    selector: 'chose-contacts',
    templateUrl: './chose-contacts.component.html',
    styleUrls: ['./chose-contacts.component.scss'],
})
export class ChoseContactsComponent implements OnInit {
    private contactService = inject(ContactServiceToken);
    private router = inject(Router);
    form = inject(AddGroupFormToken);

    labels = { contacts: 'contacts', members: 'members' };

    $contacts = this.contactService.getContacts();

    ngOnInit(): void {
        if (!this.form.exist(this.labels.contacts)) {
            this.form.addField({
                label: this.labels.contacts,
                value: [],
                validators: [getValidator(ValidatorKey.MinLengthOne)],
            });
        }
    }

    isContactSelected(person: ContactV2 | User): boolean {
        const contacts = this.form
            .getFieldFrom(this.labels.contacts)
            .getValue() as ContactsV2;
        return contacts.some((selected) => selected.getId() === person.getId());
    }

    isLastFrom(contacts: ContactsV2, index: number): boolean {
        return index === contacts.length - 1;
    }

    onButtonClicked(): void {
        const notAlreadyAddedContacts = this.getNotAlreadyAddedContacts();
        this.form
            .getFieldFrom(this.labels.members)
            .setValue(notAlreadyAddedContacts);

        this.router.navigate(['groups', 'add', 'members']);
    }

    onPersonSelected(person: ContactV2 | User): void {
        const contacts = this.form
            .getFieldFrom(this.labels.contacts)
            .getValue() as Array<ContactV2>;

        if (this.isContactSelected(person)) {
            const index = contacts.findIndex(
                (selected) => selected.getId() === person.getId(),
            );
            contacts.splice(index, 1);
        } else {
            contacts.push(person as ContactV2);
        }
        this.form.getFieldFrom(this.labels.contacts).setValue(contacts);
    }

    private getNotAlreadyAddedContacts(): (ContactV2 | User)[] {
        const contacts = this.getContacts();
        const members = this.getMembers();
        const notAlreadyAddedContacts = contacts.filter((contact) =>
            members.every((member) => member.getId() !== contact.getId()),
        );
        return members.concat(notAlreadyAddedContacts);
    }

    private getContacts(): ContactsV2 {
        return this.form
            .getFieldFrom(this.labels.contacts)
            .getValue() as ContactsV2;
    }

    private getMembers(): Array<ContactV2 | User> {
        return this.form.getFieldFrom(this.labels.members).getValue() as Array<
            ContactV2 | User
        >;
    }
}
