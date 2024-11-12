import { addExpenseRoutes } from './add-expense.routes';
import { AddExpenseView } from './add-expense.view';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AddExpenseView],
    imports: [RouterModule.forChild(addExpenseRoutes)],
})
export class AddExpenseViewModule {}
