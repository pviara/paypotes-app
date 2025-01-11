import { Component, inject, OnInit } from '@angular/core';
import { AddExpenseFormServiceToken } from '@core/services/form/form.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import {
    UserServiceProvider,
    UserServiceToken,
} from '@core/services/user/user.api-service.provider';

@Component({
    selector: 'select-person',
    templateUrl: './select-person.component.html',
    styleUrls: ['./select-person.component.scss'],
    providers: [
        UserServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class SelectPersonComponent implements OnInit {
    private form = inject(AddExpenseFormServiceToken);
    private router = inject(Router);
    private userService = inject(UserServiceToken);

    private label = 'person';

    error = '';

    searching = false;

    ngOnInit(): void {
        if (!this.form.exist(this.label)) {
            this.addFormField();
        }
    }

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
                        this.form.getFieldFrom(this.label).setValue(user);
                        this.router.navigate(['expenses', 'add', 'summary']);
                    }
                }),
            )
            .subscribe();
    }

    private addFormField(): void {
        this.form.addField({
            label: this.label,
            value: '',
        });
    }
}
