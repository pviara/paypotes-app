import { Component, computed, input } from '@angular/core';
import { GroupExpense } from '@core/model/expense/group-expense';

@Component({
    selector: 'group-expense-description',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.scss'],
})
export class ExpenseDescriptionComponent {
    expense = input.required<GroupExpense>();

    balanceToDisplay = computed(() =>
        this.expense().getBalance().replace('-', '').replace('+', ''),
    );

    isClaim = computed(() => !this.isDebt());

    isDebt = computed(() => this.expense().isDebt());

    summary = computed(() =>
        this.isDebt()
            ? `${this.expense().getCreditor().getFullName()} vous a avancé la somme de ${this.balanceToDisplay()}€ dans le groupe.`
            : `vous avez avancé ${this.expense().getInitialBalance()}€ aux membres du groupe qui vous doivent encore ${this.balanceToDisplay()}€.`,
    );

    sign = computed(() => (this.isDebt() ? '-' : '+'));

    balanceClass = computed(() => ({
        claim: this.isClaim(),
        debt: this.isDebt(),
    }));
}
