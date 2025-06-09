import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { Component, computed, inject, input } from '@angular/core';
import { GroupExpense } from '@core/model/expense/group-expense';

@Component({
    selector: 'group-expense-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
})
export class ExpenseImagesComponent {
    private authService = inject(AuthServiceToken);

    avatarUrl = computed(() =>
        this.expense().isDebt()
            ? this.expense().getCreditor().getAvatarUrl()
            : (this.authService.signedInUser?.user.getAvatarUrl() ?? ''),
    );

    expense = input.required<GroupExpense>();
}
