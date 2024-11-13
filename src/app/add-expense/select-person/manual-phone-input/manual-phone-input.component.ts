import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { mapPhoneNumberOutOf } from './formatter/formatter';
import { Observable, tap } from 'rxjs';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { User } from '@core/model/user/user';
import {
    UserServiceProvider,
    UserServiceToken,
} from '@core/services/user/user.api-service.provider';

@Component({
    selector: 'manual-phone-input',
    templateUrl: './manual-phone-input.component.html',
    styleUrls: ['./manual-phone-input.component.scss'],
    providers: [
        UserServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class ManualPhoneInputComponent {
    private userService = inject(UserServiceToken);

    control = input.required<FormControl>();

    isLoading = false;

    notFoundUser = false;

    @Output()
    searching = new EventEmitter<boolean>();

    @Output()
    userFound = new EventEmitter<User>();

    onChange(event: Event): void {
        if (this.isLoading) {
            return;
        }

        try {
            const phoneNumber = this.mapPhoneNumberOutOf(event);
            this.searching.emit(true);
            this.getUserUsing(phoneNumber).subscribe();
        } catch (error: unknown) {}
    }

    private mapPhoneNumberOutOf(event: Event) {
        const input = event.target as HTMLInputElement;
        const phoneNumber = mapPhoneNumberOutOf(input.value);
        return phoneNumber;
    }

    private getUserUsing(phoneNumber: string): Observable<User> {
        this.changeLoadingStatus();

        const cleanedPhone = this.removeSpacesFrom(phoneNumber);
        return this.userService.getUser(cleanedPhone).pipe(
            tap((user) => {
                if (!user) {
                    this.notFoundUser = true;
                    this.searching.emit(false);
                } else {
                    this.userFound.emit(user);
                }

                this.changeLoadingStatus();
            }),
        );
    }

    private changeLoadingStatus(): void {
        this.isLoading = !this.isLoading;

        const phoneControl = this.control();
        if (phoneControl.enabled) {
            phoneControl.disable();
        } else {
            phoneControl.enable();
        }
    }

    private removeSpacesFrom(value: string): string {
        return value.replaceAll(' ', '');
    }
}
