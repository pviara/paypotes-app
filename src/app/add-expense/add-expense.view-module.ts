import { addExpenseRoutes } from './add-expense.routes';
import { AddExpenseView } from './add-expense.view';
import { AddExpenseFormService } from './add-expense.form-service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SetBalanceComponentModule } from './set-balance/set-balance.component-module';

@NgModule({
    declarations: [AddExpenseView],
    imports: [
        RouterModule.forChild(addExpenseRoutes),
        SetBalanceComponentModule,
    ],
    providers: [AddExpenseFormService],
})
export class AddExpenseViewModule {}
