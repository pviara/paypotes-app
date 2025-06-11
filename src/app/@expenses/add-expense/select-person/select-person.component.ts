import { Component, inject, OnInit } from '@angular/core';
import { FormService } from '@core/services/form/form.service';
import { Router } from '@angular/router';
import { User } from '@core/model/user/user';

@Component({
    selector: 'select-person',
    templateUrl: './select-person.component.html',
    styleUrls: ['./select-person.component.scss'],
})
export class SelectPersonComponent implements OnInit {
    private formService = inject(FormService);
    private form = this.formService.injectCurrentForm();
    private router = inject(Router);

    private label = 'person';
    private temporaryUsersLabel = 'temporaryUsers';

    ngOnInit(): void {
        this.initForm();
    }

    onUserFound(user: User): void {
        this.form.setField({ label: this.label, value: user });
        this.router.navigate(['expenses', 'add', 'summary']);
    }

    onUsersFound(users: User[]): void {
        if (!this.form.exist(this.temporaryUsersLabel)) {
            this.form.addField({
                label: this.temporaryUsersLabel,
                value: users,
            });
        } else {
            this.form.getFieldFrom(this.temporaryUsersLabel).setValue(users);
        }

        this.router.navigate(['expenses', 'add', 'search']);
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
}
