import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { User } from '@core/model/user/user';
import {
    UserServiceProvider,
    UserServiceToken,
} from '@core/services/user/user.api-service.provider';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'person-form',
    templateUrl: './person-form.component.html',
    styleUrls: ['./person-form.component.scss'],
    providers: [
        UserServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class PersonFormComponent {
    private userService = inject(UserServiceToken);

    error = '';

    searching = new BehaviorSubject(false);
    searching$ = this.searching.asObservable();

    route = input.required<string>();
    text = input.required<string>();

    @Output()
    userFound = new EventEmitter<User>();

    onSearching(phoneNumber: string): void {
        this.searching.next(true);
        this.searchUserWith(phoneNumber);
    }

    private searchUserWith(phoneNumber: string): void {
        this.userService.getUser(phoneNumber).subscribe((user) => {
            if (user) this.userFound.emit(user);
            else {
                this.searching.next(false);
                this.error = 'Numéro introuvable';
            }
        });
    }
}
