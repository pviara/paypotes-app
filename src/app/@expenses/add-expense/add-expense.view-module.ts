import { addExpenseRoutes } from './add-expense.routes';
import { AddExpenseView } from './add-expense.view';
import { ChoseContactComponentModule } from './chose-contact/chose-contact.component-module';
import { FillDetailsComponentModule } from './fill-details/fill-details.component-module';
import { NgModule } from '@angular/core';
import { ReadSummaryComponentModule } from './read-summary/read-summary.component-module';
import { RouterModule } from '@angular/router';
import { SelectEmojiComponentModule } from './select-emoji/select-emoji.component-module';
import { SelectPersonComponentModule } from './select-person/select-person.component-module';
import { SetBalanceComponentModule } from './set-balance/set-balance.component-module';
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
