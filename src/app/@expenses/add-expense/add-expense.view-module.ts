import { addExpenseRoutes } from '@expenses/add-expense/add-expense.routes';
import { AddExpenseView } from '@expenses/add-expense/add-expense.view';
import { ChoseContactComponentModule } from '@expenses/add-expense/chose-contact/chose-contact.component-module';
import { FillDetailsComponentModule } from '@shared/components/fill-details/fill-details.component-module';
import { NgModule } from '@angular/core';
import { ReadSummaryComponentModule } from '@expenses/add-expense/read-summary/read-summary.component-module';
import { RouterModule } from '@angular/router';
import { SelectEmojiComponentModule } from '@expenses/add-expense/select-emoji/select-emoji.component-module';
import { SelectPersonComponentModule } from '@expenses/add-expense/select-person/select-person.component-module';
import { SetBalanceComponentModule } from '@expenses/add-expense/set-balance/set-balance.component-module';
import { ServicesModule } from '@core/services/services.module';

@NgModule({
    declarations: [AddExpenseView],
    imports: [
        ChoseContactComponentModule,
        FillDetailsComponentModule,
        ReadSummaryComponentModule,
        RouterModule.forChild(addExpenseRoutes),
        SelectEmojiComponentModule,
        SelectPersonComponentModule,
        SetBalanceComponentModule,
        ServicesModule,
    ],
})
export class AddExpenseViewModule {}
