import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { Component, input } from '@angular/core';

type PhoneFormControl = AddExpenseForm['phone'];

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    phone = input.required<PhoneFormControl>();

    onPhoneInput(phone: any): void {
        this.phone().setValue(phone.target.value);
        console.log(this.phone().value, this.phone().valid);
    }
}
