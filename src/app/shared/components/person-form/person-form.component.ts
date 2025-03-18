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

    $searching = new BehaviorSubject(false);

    route = input.required<string>();
    text = input.required<string>();

    @Output()
    userFound = new EventEmitter<User>();

    @Output()
    usersFound = new EventEmitter<User[]>();

    onSearching(name: string): void {
        this.$searching.next(true);
        this.searchUserWith(name);
    }

    private searchUserWith(name: string): void {
        this.userService.getUserByName(name).subscribe((users) => {
            if (users.length === 0) {
                this.$searching.next(false);
                this.error = 'Aucun utilisateur trouvé';
            }

            if (users.length > 1) this.usersFound.emit(users);
            else this.userFound.emit(users[0]);
        });
    }
}
