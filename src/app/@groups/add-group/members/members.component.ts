import { AddGroupFormToken } from '@core/services/form/form.provider';
import { Component, inject, OnInit } from '@angular/core';
import { Contacts } from '@core/model/contact/contact';
import { getValidator, ValidatorKey } from '@core/model/form/validator';
import { Members } from '@core/model/group/member';
import { Router } from '@angular/router';

@Component({
    selector: 'members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
    standalone: false,
})
export class MembersComponent implements OnInit {
    private router = inject(Router);
    form = inject(AddGroupFormToken);

    labels = { members: 'members', persons: 'persons ' };

    ngOnInit(): void {
        if (!this.form.exist(this.labels.members)) {
            this.form.addField({
                label: this.labels.members,
                value: [],
                validators: [getValidator(ValidatorKey.MinLengthTwo)],
            });
        }
    }

    getContacts(): Contacts {
        return this.form.getFieldFrom(this.labels.persons).getValue<Contacts>();
    }

    getMembers(): Members {
        return this.form.getFieldFrom(this.labels.members).getValue<Members>();
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
            this.form.getFieldFrom(this.labels.members).setValue(members);
        }

        const contacts = this.getContacts();
        const contactIndex = contacts.findIndex(
            (contact) => contact.getId() === id,
        );
        if (contactIndex > -1) {
            contacts.splice(contactIndex, 1);
            this.form.getFieldFrom(this.labels.persons).setValue(contacts);
        }
    }
}
