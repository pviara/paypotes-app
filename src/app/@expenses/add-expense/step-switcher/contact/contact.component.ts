import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { Component, inject, input, OnInit } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
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
            phone: this.formBuilder.nonNullable.control('', [
                Validators.required,
                Validators.maxLength(14),
                Validators.minLength(14),
                this.forbiddenPhoneValidator(),
            ]),
        });

        const phoneControl = this.form.controls.phone;
        phoneControl.valueChanges
            .pipe(
                switchMap(() => {
                    if (phoneControl.valid) {
                        phoneControl.disable();
                        this.changeLoadingStatus();

                        return this.getUserUsing(phoneControl);
                    }
                    return of(null);
                }),
            )
            .subscribe();
    }

    private forbiddenPhoneValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const forbidden = this.isInvalidPhoneNumber(control.value);
            return forbidden ? { emoji: { value: control.value } } : null;
        };
    }

    private isInvalidPhoneNumber(value: string): boolean {
        return !value.startsWith('06') && !value.startsWith('07');
    }

    private getUserUsing(phoneControl: FormControl<string>): Observable<User> {
        const cleanedPhone = this.removeSpacesFrom(phoneControl.getRawValue());
        return this.userService.getUser(cleanedPhone).pipe(
            tap((user) => {
                if (!user) {
                    this.notFoundUser = true;
                } else {
                    this.user().setValue(user);
                }

                this.changeLoadingStatus();
                phoneControl.enable({ emitEvent: false });
            }),
        );
    }

    private changeLoadingStatus(): void {
        this.isLoading = !this.isLoading;
    }

    private removeSpacesFrom(value: string): string {
        return value.replaceAll(' ', '');
    }
}
