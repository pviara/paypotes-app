import { AddExpenseFormToken } from '@core/services/form/form.provider';
import { Component, inject } from '@angular/core';
import { Contact, Contacts } from '@core/model/contact/contact';
import { Members, Member } from '@core/model/group/member';
import { Router } from '@angular/router';
import { ContactsV2, ContactV2 } from '@core/model/contact/v2/contact';

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
        .getValue<ContactsV2 | Members>();

    onPersonSelected(person: ContactV2 | Member): void {
        this.form.getFieldFrom(this.label).setValue(person);
        this.router.navigate(['expenses', 'add', 'summary']);
    }
}
