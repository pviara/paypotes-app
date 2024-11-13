import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@core/model/user/user';

type SelectPersonForm = {
    phone: FormControl<string>;
};

@Component({
    selector: 'select-person',
    templateUrl: './select-person.component.html',
    styleUrls: ['./select-person.component.scss'],
})
export class SelectPersonComponent {
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);

    form = this.formBuilder.group<SelectPersonForm>({
        phone: this.formBuilder.nonNullable.control(''),
    });

    searching = false;

    onSearching(searching: any): void {
        this.searching = searching;
    }

    onUserFound(user: User): void {
        console.log('🚨 found user:', user);
        this.router.navigate(['add-expense', 'summary']);
    }
}
