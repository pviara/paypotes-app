import { Component, inject, OnInit } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { FormServiceToken } from '@core/services/form/form.service.provider';
import { getValidator, ValidatorKey } from '@core/model/form/validator';
import { User } from '@core/model/user/user';

@Component({
    selector: 'members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
    form = inject(FormServiceToken);

    label = 'members';

    ngOnInit(): void {
        if (!this.form.exist(this.label)) {
            this.form.addField({
                label: this.label,
                value: [],
                validators: [getValidator(ValidatorKey.MinLengthTwo)],
            });
        }
    }

    getMembers(): Array<User | Contact> {
        return [];
    }
}
