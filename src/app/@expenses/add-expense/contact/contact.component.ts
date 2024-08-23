import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { UserServiceToken } from '@core/services/user/user.api-service.provider';

type PhoneFormControl = AddExpenseForm['phone'];

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    private userService = inject(UserServiceToken);

    isLoading = false;

    notFoundUser = false;

    phone = input.required<PhoneFormControl>();

    @Output()
    load = new EventEmitter<boolean>();

    onPhoneInput(phone: any): void {
        const { value } = phone.target;
        this.phone().setValue(value);

        if (this.phone().valid) {
            this.changeLoadingStatus();
            this.userService
                .getUser(this.removeSpacesFrom(value))
                .subscribe((user) => {
                    console.log(user);
                    this.changeLoadingStatus();

                    this.notFoundUser = true;
                });
        }
    }

    private changeLoadingStatus(): void {
        this.isLoading = !this.isLoading;
        this.load.emit(this.isLoading);
    }

    private removeSpacesFrom(value: string): string {
        return value.replaceAll(' ', '');
    }
}
