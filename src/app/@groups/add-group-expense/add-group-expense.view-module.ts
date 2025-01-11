import { addGroupExpenseRoutes } from '@groups/add-group-expense/add-group-expense.routes';
import { AddGroupExpenseView } from '@groups/add-group-expense/add-group-expense.view';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AddGroupExpenseView],
    imports: [RouterModule.forChild(addGroupExpenseRoutes)],
})
export class AddGroupExpenseViewModule {}
