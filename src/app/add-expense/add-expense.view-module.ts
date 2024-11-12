import { addExpenseRoutes } from './add-expense.routes';
import { AddExpenseView } from './add-expense.view';
import { AddExpenseViewService } from './add-expense.view-service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AddExpenseView],
    imports: [RouterModule.forChild(addExpenseRoutes)],
    providers: [AddExpenseViewService],
})
export class AddExpenseViewModule {}
