import { AddExpenseComponentModule } from '@expenses/add-expense/add-expense.component-module';
import { CommonModule } from '@angular/common';
import { ExpenseComponentModule } from '@expenses/expense/expense.component-module';
import { ExpensesComponentModule } from '@expenses/expenses/expenses.component-module';
import { expensesRoutes } from '@expenses/expenses.routes';
import { ExpensesView } from '@expenses/expenses.view';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesModule } from '@core/services.module';

@NgModule({
    declarations: [ExpensesView],
    exports: [RouterModule],
    imports: [
        AddExpenseComponentModule,
        CommonModule,
        ExpenseComponentModule,
        ExpensesComponentModule,
        RouterModule.forChild(expensesRoutes),
        ServicesModule,
    ],
})
export class ExpensesViewModule {}
