import { Component, EventEmitter, inject, input, Output } from '@angular/core';
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
})
export class ManualPhoneInputComponent {
    isLoading = input<boolean>(false);

    error = input<string>();

    @Output()
    searching = new EventEmitter<string>();

    onChange(event: Event): void {
        if (this.isLoading()) {
            return;
        }

        try {
            const phoneNumber = this.mapPhoneNumberOutOf(event);
            this.searching.emit(this.removeSpacesFrom(phoneNumber));
        } catch (error: unknown) {}
    }

    private mapPhoneNumberOutOf(event: Event) {
        const input = event.target as HTMLInputElement;
        const phoneNumber = mapPhoneNumberOutOf(input.value);
        return phoneNumber;
    }

    private removeSpacesFrom(value: string): string {
        return value.replaceAll(' ', '');
    }

    /*private getUserUsing(phoneNumber: string): Observable<User> {
        this.changeLoadingStatus();

        const cleanedPhone = this.removeSpacesFrom(phoneNumber);
        return this.userService.getUser(cleanedPhone).pipe(
            tap((user) => {
                if (!user) {
                    this.notFoundUser = true;
                    this.searching.emit(false);
                } else {
                    this.userFound.emit();
                }

                this.changeLoadingStatus();
            }),
        );
    }

    private changeLoadingStatus(): void {
        this.isLoading = !this.isLoading;
    }*/
}
