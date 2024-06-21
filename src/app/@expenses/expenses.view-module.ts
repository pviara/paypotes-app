import { CommonModule } from '@angular/common';
import { ExpenseComponentModule } from '@expenses/expense/expense.component-module';
import { ExpensesComponentModule } from '@expenses/expenses/expenses.component-module';
import { expensesRoutes } from '@expenses/expenses.routes';
import { ExpensesView } from '@expenses/expenses.view';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ExpensesView],
    exports: [RouterModule],
    imports: [
        CommonModule,
        ExpenseComponentModule,
        ExpensesComponentModule,
        RouterModule.forChild(expensesRoutes),
    ],
})
export class ExpensesViewModule {}
