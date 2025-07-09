import { AddExpenseFormToken } from '@core/services/form/form.provider';
import { addExpenseRoutes } from '@expenses/add-expense/add-expense.routes';
import { AddExpenseView } from '@expenses/add-expense/add-expense.view';
import { ChoseContactComponentModule } from '@expenses/add-expense/chose-contact/chose-contact.component-module';
import { ChoseUserFromSearchComponentModule } from '@expenses/add-expense/chose-user-from-search/chose-user-from-search.component-module';
import { FillDetailsComponentModule } from '@expenses/add-expense/fill-details/fill-details.component-module';
import { FormService } from '@core/services/form/form.service';
import { NgModule } from '@angular/core';
import { ReadSummaryComponentModule } from '@expenses/add-expense/read-summary/read-summary.component-module';
import { RouterModule } from '@angular/router';
import { SelectEmojiComponentModule } from '@expenses/add-expense/select-emoji/select-emoji.component-module';
import { SelectPersonComponentModule } from '@expenses/add-expense/select-person/select-person.component-module';
import { SetBalanceComponentModule } from '@expenses/add-expense/set-balance/set-balance.component-module';

@NgModule({
    declarations: [AddExpenseView],
    imports: [
        ChoseContactComponentModule,
        ChoseUserFromSearchComponentModule,
        FillDetailsComponentModule,
        ReadSummaryComponentModule,
        RouterModule.forChild(addExpenseRoutes),
        SelectEmojiComponentModule,
        SelectPersonComponentModule,
        SetBalanceComponentModule,
    ],
})
export class AddExpenseViewModule {
    constructor(private formService: FormService) {
        this.formService.use(AddExpenseFormToken);
    }
}
