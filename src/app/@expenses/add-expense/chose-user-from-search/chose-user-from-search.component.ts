import { AddExpenseFormToken } from '@core/services/form/form.provider';
import { Component, inject } from '@angular/core';
import { Contact, Contacts } from '@core/model/contact/contact';
import { MembersV2, MemberV2 } from '@core/model/group/v2/member';
import { Router } from '@angular/router';

@Component({
    selector: 'chose-user-from-search',
    templateUrl: './chose-user-from-search.component.html',
    styleUrls: ['./chose-user-from-search.component.scss'],
})
export class ChoseUserFromSearchComponent {
    private form = inject(AddExpenseFormToken);
    private router = inject(Router);

    private label = 'person';
    private temporaryUsersLabel = 'temporaryUsers';

    users = this.form
        .getFieldFrom(this.temporaryUsersLabel)
        .getValue<Contacts | MembersV2>();

    onPersonSelected(person: Contact | MemberV2): void {
        this.form.getFieldFrom(this.label).setValue(person);
        this.router.navigate(['expenses', 'add', 'summary']);
    }
}
