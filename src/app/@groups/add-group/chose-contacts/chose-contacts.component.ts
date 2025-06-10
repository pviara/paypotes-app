import { AddGroupFormToken } from '@core/services/form/form.provider';
import { Component, inject, OnInit } from '@angular/core';
import { Contact, Contacts } from '@core/model/contact/contact';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
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

    // stays here
    ngOnInit(): void {
        if (!this.form.exist(this.labels.contacts)) {
            this.form.addField({
                label: this.labels.contacts,
                value: [],
                validators: [getValidator(ValidatorKey.MinLengthOne)],
            });
        }
    }

    // goes to child component
    isContactSelected(person: Contact | User): boolean {
        const contacts = this.form
            .getFieldFrom(this.labels.contacts)
            .getValue() as Contacts;
        return contacts.some((selected) => selected.getId() === person.getId());
    }

    // goes to child component
    isLastFrom(contacts: Contacts, index: number): boolean {
        return index === contacts.length - 1;
    }

    // stays here
    onButtonClicked(): void {
        const notAlreadyAddedContacts = this.getNotAlreadyAddedContacts();
        this.form
            .getFieldFrom(this.labels.members)
            .setValue(notAlreadyAddedContacts);

        this.router.navigate(['groups', 'add', 'members']);
    }

    // stays here
    onPersonSelected(person: Contact | User): void {
        const contacts = this.form
            .getFieldFrom(this.labels.contacts)
            .getValue() as Array<Contact>;

        if (this.isContactSelected(person)) {
            const index = contacts.findIndex(
                (selected) => selected.getId() === person.getId(),
            );
            contacts.splice(index, 1);
        } else {
            contacts.push(person as Contact);
        }
        this.form.getFieldFrom(this.labels.contacts).setValue(contacts);
    }

    // stays here
    private getNotAlreadyAddedContacts(): (Contact | User)[] {
        const contacts = this.getContacts();
        const members = this.getMembers();
        const notAlreadyAddedContacts = contacts.filter((contact) =>
            members.every((member) => member.getId() !== contact.getId()),
        );
        return members.concat(notAlreadyAddedContacts);
    }

    private getContacts(): Contacts {
        return this.form
            .getFieldFrom(this.labels.contacts)
            .getValue() as Contacts;
    }

    private getMembers(): Array<Contact | User> {
        return this.form.getFieldFrom(this.labels.members).getValue() as Array<
            Contact | User
        >;
    }
}
