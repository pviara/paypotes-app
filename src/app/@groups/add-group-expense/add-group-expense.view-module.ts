import { addGroupExpenseRoutes } from '@groups/add-group-expense/add-group-expense.routes';
import { AddGroupExpenseView } from '@groups/add-group-expense/add-group-expense.view';
import { FillDetailsComponentModule } from '@groups/add-group-expense/fill-details/fill-details.component-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectEmojiComponentModule } from '@groups/add-group-expense/select-emoji/select-emoji.component-module';
import { SetBalanceComponentModule } from '@groups/add-group-expense/set-balance/set-balance.component-module';

@NgModule({
    declarations: [AddGroupExpenseView],
    imports: [
        FillDetailsComponentModule,
        RouterModule.forChild(addGroupExpenseRoutes),
        SelectEmojiComponentModule,
        SetBalanceComponentModule,
    ],
})
export class AddGroupExpenseViewModule {}
