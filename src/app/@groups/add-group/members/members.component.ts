import { Component, inject, OnInit } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { AddExpenseFormServiceToken } from '@core/services/form/form.service.provider';
import { getValidator, ValidatorKey } from '@core/model/form/validator';
import { Router } from '@angular/router';
import { User } from '@core/model/user/user';

@Component({
    selector: 'members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
    private router = inject(Router);
    form = inject(AddExpenseFormServiceToken);

    label = 'members';

    ngOnInit(): void {
        if (!this.form.exist(this.label)) {
            this.form.addField({
                label: this.label,
                value: [],
                validators: [getValidator(ValidatorKey.MinLengthTwo)],
            });
        }
    }

    getContacts(): Array<Contact | User> {
        return this.form.getFieldFrom('contacts').getValue() as Array<Contact>;
    }

    getMembers(): Array<Contact | User> {
        return this.form.getFieldFrom(this.label).getValue() as Array<
            Contact | User
        >;
    }

    onButtonClicked(): void {
        this.router.navigate(['groups', 'add', 'summary']);
    }

    onDeleteMember(id: string): void {
        const members = this.getMembers();
        const memberIndex = members.findIndex(
            (member) => member.getId() === id,
        );
        if (memberIndex > -1) {
            members.splice(memberIndex, 1);
            this.form.getFieldFrom(this.label).setValue(members);
        }

        const contacts = this.getContacts();
        const contactIndex = contacts.findIndex(
            (contact) => contact.getId() === id,
        );
        if (contactIndex > -1) {
            contacts.splice(contactIndex, 1);
            this.form.getFieldFrom('contacts').setValue(contacts);
        }
    }
}
