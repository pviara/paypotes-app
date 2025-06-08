import { AddExpenseFormToken } from '@core/services/form/form.provider';
import { Component, inject } from '@angular/core';
import { Members, Member } from '@core/model/group/member';
import { Router } from '@angular/router';
import { Contacts, Contact } from '@core/model/contact/contact';

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
        .getValue<Contacts | Members>();

    onPersonSelected(person: Contact | Member): void {
        this.form.getFieldFrom(this.label).setValue(person);
        this.router.navigate(['expenses', 'add', 'summary']);
    }
}
