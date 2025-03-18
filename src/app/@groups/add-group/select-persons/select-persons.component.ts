import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/model/user/user';
import { FormService } from '@core/services/form/form.service';
import { Form } from '@core/model/form/form';

@Component({
    selector: 'select-persons',
    templateUrl: './select-persons.component.html',
    styleUrls: ['./select-persons.component.scss'],
})
export class SelectPersonsComponent implements OnInit {
    private formService = inject(FormService);
    private form = this.injectCurrentForm();
    private router = inject(Router);

    private label = 'members';

    ngOnInit(): void {
        this.initForm();
    }

    onUserFound(user: User): void {
        const members = this.form
            .getFieldFrom(this.label)
            .getValue() as Array<User>;
        members.push(user);

        this.form.getFieldFrom(this.label).setValue(members);
        this.router.navigate(['groups', 'add', 'members']);
    }

    onUsersFound(users: User[]): void {
        console.log('multiple users found:', users);
        // // this.form.setField({ label: this.label, value: user });
        // // this.router.navigate(['expenses', 'add', 'summary']);
    }

    private injectCurrentForm(): Form {
        const currentFormToken = this.formService.getUsedForm();
        return inject(currentFormToken);
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
