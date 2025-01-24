import { Component, inject, OnInit } from '@angular/core';
import { Form } from '@core/model/form/form';
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
    private form = this.injectCurrentForm();
    private router = inject(Router);

    private label = 'person';

    ngOnInit(): void {
        this.initForm();
    }

    onUserFound(user: User): void {
        this.form.setField({ label: this.label, value: user });
        this.router.navigate(['expenses', 'add', 'summary']);
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
