import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { mapPhoneNumberOutOf } from '@shared/directives/formatter';
import { Observable, tap } from 'rxjs';
import { User } from '@core/model/user/user';
import { UserServiceToken } from '@core/services/user/user.api-service.provider';

type UserFormControl = AddExpenseForm['user'];

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    private formBuilder = inject(FormBuilder);
    private userService = inject(UserServiceToken);

    form!: FormGroup<{ phone: FormControl<string> }>;

    isLoading = false;

    notFoundUser = false;

    user = input.required<UserFormControl>();

    ngOnInit(): void {
        this.form = this.formBuilder.nonNullable.group({
            phone: this.formBuilder.nonNullable.control(''),
        });
    }

    onChange(event: Event): void {
        if (this.isLoading) {
            return;
        }

        try {
            const phoneNumber = this.mapPhoneNumberOutOf(event);
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
                } else {
                    this.user().setValue(user);
                }

                this.changeLoadingStatus();
            }),
        );
    }

    private changeLoadingStatus(): void {
        this.isLoading = !this.isLoading;

        const phoneControl = this.form.controls.phone;
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
