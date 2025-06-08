import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'group-expense-description',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.scss'],
})
export class ExpenseDescriptionComponent {
    balance = input.required<string>();

    balanceToDisplay = computed(() =>
        this.balance().replace('-', '').replace('+', ''),
    );

    date = input.required<Date>();

    isClaim = computed(() => !this.isDebt());

    isDebt = input.required<boolean>();

    name = input.required<string>();

    sign = computed(() => (this.isDebt() ? '-' : '+'));

    balanceClass = computed(() => ({
        claim: this.isClaim(),
        debt: this.isDebt(),
    }));
}
