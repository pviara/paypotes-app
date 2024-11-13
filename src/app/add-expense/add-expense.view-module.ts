import { addExpenseRoutes } from './add-expense.routes';
import { AddExpenseView } from './add-expense.view';
import { AddExpenseFormService } from './add-expense.form-service';
import { FillDetailsComponentModule } from './fill-details/fill-details.component-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectEmojiComponentModule } from './select-emoji/select-emoji.component-module';
import { SelectPersonComponentModule } from './select-person/select-person.component-module';
import { SetBalanceComponentModule } from './set-balance/set-balance.component-module';

@NgModule({
    declarations: [AddExpenseView],
    imports: [
        FillDetailsComponentModule,
        RouterModule.forChild(addExpenseRoutes),
        SelectEmojiComponentModule,
        SelectPersonComponentModule,
        SetBalanceComponentModule,
    ],
    providers: [AddExpenseFormService],
})
export class AddExpenseViewModule {}
