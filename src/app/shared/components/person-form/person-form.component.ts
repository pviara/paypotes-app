import { Capacitor } from '@capacitor/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { NotificationService } from '@core/services/notification/notification.service';
import { User, Users } from '@core/model/user/user';
import { UserServiceToken } from '@core/services/user/user.api-service.provider';

@Component({
    selector: 'person-form',
    templateUrl: './person-form.component.html',
    styleUrls: ['./person-form.component.scss'],
    standalone: false,
})
export class PersonFormComponent {
    private notificationService = inject(NotificationService);
    private userService = inject(UserServiceToken);

    error = '';

    $searching = new BehaviorSubject(false);

    route = input.required<string>();
    text = input.required<string>();

    @Output()
    userFound = new EventEmitter<User>();

    @Output()
    usersFound = new EventEmitter<Users>();

    onKeyboardEnter(event: Event): void {
        event.preventDefault();
        if (Capacitor.getPlatform() !== 'web') Keyboard.hide();
    }

    onSearching(name: string): void {
        this.$searching.next(true);
        this.searchUserWith(name);
    }

    private searchUserWith(name: string): void {
        this.userService
            .getUserByName(name)
            .pipe(
                tap((users) => {
                    if (users.length === 0) {
                        this.$searching.next(false);
                        this.error = 'Aucun utilisateur trouvé';
                    } else if (users.length > 1) this.usersFound.emit(users);
                    else this.userFound.emit(users[0]);
                }),
                catchError((error) => {
                    this.notificationService.notify({
                        type: 'error',
                        message: 'La recherche a échoué',
                    });
                    this.$searching.next(false);
                    return of(error);
                }),
            )
            .subscribe();
    }
}
