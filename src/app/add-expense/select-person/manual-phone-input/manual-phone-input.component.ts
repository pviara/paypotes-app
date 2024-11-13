import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { mapPhoneNumberOutOf } from './formatter/formatter';
import { Observable, tap } from 'rxjs';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { User } from '@core/model/user/user';
import {
    UserServiceProvider,
    UserServiceToken,
} from '@core/services/user/user.api-service.provider';

type ManualPhoneForm = {
    phone: FormControl<string>;
};

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
export class ManualPhoneInputComponent implements OnInit {
    private formBuilder = inject(FormBuilder);
    private userService = inject(UserServiceToken);

    isLoading = false;

    manualPhoneForm!: FormGroup<ManualPhoneForm>;

    notFoundUser = false;

    @Output()
    searching = new EventEmitter<boolean>();

    @Output()
    userFound = new EventEmitter<User>();

    ngOnInit(): void {
        this.manualPhoneForm = this.formBuilder.group({
            phone: this.formBuilder.nonNullable.control(''),
        });
    }

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

        const phoneControl = this.manualPhoneForm.controls.phone;
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
