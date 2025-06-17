import {
    AuthServiceProvider,
    AuthServiceToken,
} from '@core/services/auth/auth.api-service.provider';
import { Component, computed, inject, input } from '@angular/core';
import { GroupExpense } from '@core/model/expense/group-expense';
import { PairExpense } from '@core/model/expense/pair-expense';

@Component({
    selector: 'expense-description',
    templateUrl: './expense-description.component.html',
    styleUrls: ['./expense-description.component.scss'],
    providers: [AuthServiceProvider],
})
export class ExpenseDescriptionComponent {
    private authService = inject(AuthServiceToken);

    expense = input.required<GroupExpense | PairExpense>();

    emoji = computed(() => this.expense().getEmoji());

    label = computed(() => this.expense().getLabel());

    counterpartySummary = computed(() => {
        const expense = this.expense();
        if (expense instanceof PairExpense) {
            const counterparty = expense.getCounterparty().getFullName();
            return expense.isDebt()
                ? `de <span class="bold">${counterparty}</span>`
                : `à <span class="bold">${counterparty}</span>`;
        }

        const creditor = expense.getCreditor();
        const signedInUserIsCreditor =
            creditor.getId() === this.authService.signedInUser?.user.getId();

        return signedInUserIsCreditor
            ? `de <span class="bold">vous</span> dans <span class="bold">${expense.getGroup().getName()}</span>`
            : `à <span class="bold">${creditor.getFullName()}</span>`;
    });
}
