import { Component, inject } from '@angular/core';
import { FormService } from '@core/services/form/form.service';
import { Person, Persons } from '@core/model/person';
import { Router } from '@angular/router';

@Component({
    selector: 'chose-user-from-search',
    templateUrl: './chose-user-from-search.component.html',
    styleUrls: ['./chose-user-from-search.component.scss'],
    standalone: false,
})
export class ChoseUserFromSearchComponent {
    private formService = inject(FormService);
    private form = this.formService.injectCurrentForm();
    private router = inject(Router);

    private label = 'person';
    private temporaryUsersLabel = 'temporaryUsers';

    users = this.form
        .getFieldFrom(this.temporaryUsersLabel)
        .getValue<Persons>();

    onPersonSelected(person: Person): void {
        this.form.getFieldFrom(this.label).setValue(person);
        this.router.navigate(['expenses', 'add', 'summary']);
    }
}
