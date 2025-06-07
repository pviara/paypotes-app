import { AddGroupFormToken } from '@core/services/form/form.provider';
import { Component, inject } from '@angular/core';
import { Contact, Contacts } from '@core/model/contact/contact';
import { Router } from '@angular/router';
import { MembersV2, MemberV2 } from '@core/model/group/v2/member';

@Component({
    selector: 'chose-user-from-search',
    templateUrl: './chose-user-from-search.component.html',
    styleUrls: ['./chose-user-from-search.component.scss'],
})
export class ChoseUserFromSearchComponent {
    private form = inject(AddGroupFormToken);
    private router = inject(Router);

    private label = 'members';
    private temporaryUsersLabel = 'temporaryUsers';

    users = this.form
        .getFieldFrom(this.temporaryUsersLabel)
        .getValue<Contacts | MembersV2>();

    onPersonSelected(person: Contact | MemberV2): void {
        const members = this.form
            .getFieldFrom(this.label)
            .getValue() as MembersV2;
        members.push(person as MemberV2);

        this.router.navigate(['groups', 'add', 'members']);
    }
}
