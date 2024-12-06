import { Component, inject } from '@angular/core';
import { FormServiceToken } from '@core/services/form/form.service.provider';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '@core/model/user/user';
import { UserServiceToken } from '@core/services/user/user.api-service.provider';

@Component({
    selector: 'select-persons',
    templateUrl: './select-persons.component.html',
    styleUrls: ['./select-persons.component.scss'],
})
export class SelectPersonsComponent {
    private form = inject(FormServiceToken);
    private router = inject(Router);
    private userService = inject(UserServiceToken);

    private label = 'members';

    error = '';

    searching = false;

    onSearching(phoneNumber: string): void {
        this.searching = true;
        this.searchUserWith(phoneNumber);
    }

    private searchUserWith(phoneNumber: string): void {
        this.userService
            .getUser(phoneNumber)
            .pipe(
                tap((user) => {
                    if (!user) {
                        this.searching = false;
                        this.error = 'Numéro introuvable';
                    } else {
                        const members = this.form
                            .getFieldFrom(this.label)
                            .getValue() as Array<User>;
                        members.push(user);
                        this.form.getFieldFrom(this.label).setValue(members);
                        this.router.navigate(['groups', 'add', 'members']);
                    }
                }),
            )
            .subscribe();
    }
}
