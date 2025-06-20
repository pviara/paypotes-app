import { Component, inject, OnInit } from '@angular/core';
import { FormService } from '@core/services/form/form.service';
import { NotificationService } from '@core/services/notification/notification.service';
import { Persons } from '@core/model/person';
import { Router } from '@angular/router';
import { User, Users } from '@core/model/user/user';

@Component({
    selector: 'select-persons',
    templateUrl: './select-persons.component.html',
    styleUrls: ['./select-persons.component.scss'],
})
export class SelectPersonsComponent implements OnInit {
    private formService = inject(FormService);
    private form = this.formService.injectCurrentForm();
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    private label = 'members';
    private temporaryUsersLabel = 'temporaryUsers';

    ngOnInit(): void {
        this.initForm();
    }

    onUserFound(user: User): void {
        const members = this.form.getFieldFrom(this.label).getValue<Persons>();
        if (this.alreadyAddedIn(members, user)) {
            this.notificationService.notify({
                type: 'error',
                message: `L'utilisateur est déjà dans le groupe !`,
            });
        } else {
            members.push(user);
            this.form.getFieldFrom(this.label).setValue(members);
        }
        this.router.navigate(['groups', 'add', 'members']);
    }

    onUsersFound(users: Users): void {
        if (!this.form.exist(this.temporaryUsersLabel)) {
            this.form.addField({
                label: this.temporaryUsersLabel,
                value: users,
            });
        } else {
            this.form.getFieldFrom(this.temporaryUsersLabel).setValue(users);
        }
        this.router.navigate(['groups', 'add', 'members', 'search']);
    }

    private initForm(): void {
        if (!this.form.exist(this.label)) this.addFormField();
    }

    private addFormField(): void {
        this.form.addField({
            label: this.label,
            value: '',
        });
    }

    private alreadyAddedIn(members: Persons, user: User): boolean {
        return members.some((members) => members.getId() === user.getId());
    }
}
