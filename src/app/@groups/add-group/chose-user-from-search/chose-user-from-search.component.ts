import { Component, inject, OnInit } from '@angular/core';
import { FormService } from '@core/services/form/form.service';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification/notification.service';
import { Person, Persons } from '@core/model/person';

@Component({
    selector: 'chose-user-from-search',
    templateUrl: './chose-user-from-search.component.html',
    styleUrls: ['./chose-user-from-search.component.scss'],
})
export class ChoseUserFromSearchComponent implements OnInit {
    private formService = inject(FormService);
    private form = this.formService.injectCurrentForm();
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    private label = 'members';
    private temporaryUsersLabel = 'temporaryUsers';

    users = this.form
        .getFieldFrom(this.temporaryUsersLabel)
        .getValue<Persons>();

    ngOnInit(): void {
        if (this.allUsersAlreadyExistInMembers()) {
            this.notificationService.notify({
                type: 'error',
                message: 'Les utilisateurs sont déjà dans le groupe !',
            });
            this.router.navigate(['groups', 'add', 'members']);
        }
    }

    onPersonSelected(person: Person): void {
        const members = this.getMembers();
        members.push(person);

        this.router.navigate(['groups', 'add', 'members']);
    }

    private allUsersAlreadyExistInMembers(): boolean {
        return this.users.every((user) =>
            this.getMembers().some((member) => member.getId() === user.getId()),
        );
    }

    private getMembers(): Persons {
        return this.form.getFieldFrom(this.label).getValue<Persons>();
    }
}
