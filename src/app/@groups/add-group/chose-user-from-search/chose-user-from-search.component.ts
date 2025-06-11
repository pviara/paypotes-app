import { Component, inject } from '@angular/core';
import { Contacts, Contact } from '@core/model/contact/contact';
import { FormService } from '@core/services/form/form.service';
import { Router } from '@angular/router';
import { Members, Member } from '@core/model/group/member';

@Component({
    selector: 'chose-user-from-search',
    templateUrl: './chose-user-from-search.component.html',
    styleUrls: ['./chose-user-from-search.component.scss'],
})
export class ChoseUserFromSearchComponent {
    private formService = inject(FormService);
    private form = this.formService.injectCurrentForm();
    private router = inject(Router);

    private label = 'members';
    private temporaryUsersLabel = 'temporaryUsers';

    users = this.form
        .getFieldFrom(this.temporaryUsersLabel)
        .getValue<Contacts | Members>();

    onPersonSelected(person: Contact | Member): void {
        const members = this.form
            .getFieldFrom(this.label)
            .getValue() as Members;
        members.push(person as Member);

        this.router.navigate(['groups', 'add', 'members']);
    }
}
