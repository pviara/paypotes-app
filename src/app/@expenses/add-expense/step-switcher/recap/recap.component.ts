import { AddExpenseForm } from '../../model/add-expense-form';
import { Component, computed, input } from '@angular/core';

type BalanceFormControl = AddExpenseForm['balance'];
type IsCurrentPayerFormControl = AddExpenseForm['isCurrentPayer'];
type UserFormControl = AddExpenseForm['user'];

@Component({
    selector: 'recap',
    templateUrl: './recap.component.html',
    styleUrls: ['./recap.component.scss'],
})
export class RecapComponent {
    avatarURL = computed(() => this.user().value?.getAvatarURL());

    balance = input.required<BalanceFormControl>();

    fullName = computed(() => this.user().value?.getFullName());

    isCurrentPayer = input.required<IsCurrentPayerFormControl>();

    user = input.required<UserFormControl>();
}
