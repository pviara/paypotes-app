import { AddGroupFormToken } from '@core/services/form/form.provider';
import { Component, inject } from '@angular/core';
import { ContactsV2, ContactV2 } from '@core/model/contact/v2/contact';
import { Router } from '@angular/router';
import { Members, Member } from '@core/model/group/member';

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
        .getValue<ContactsV2 | Members>();

    onPersonSelected(person: ContactV2 | Member): void {
        const members = this.form
            .getFieldFrom(this.label)
            .getValue() as Members;
        members.push(person as Member);

        this.router.navigate(['groups', 'add', 'members']);
    }
}
