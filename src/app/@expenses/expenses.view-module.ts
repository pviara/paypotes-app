import { CommonModule } from '@angular/common';
import { ExpensesComponentModule } from '@expenses/expenses/expenses.component-module';
import { expensesRoutes } from '@expenses/expenses.routes';
import { ExpensesView } from '@expenses/expenses.view';
import { GroupExpenseComponentModule } from '@expenses/group-expense/group-expense.component-module';
import { NgModule } from '@angular/core';
import { PairExpenseComponentModule } from '@expenses/pair-expense/pair-expense.component-module';
import { RouterModule } from '@angular/router';
import { ServicesModule } from '@core/services/services.module';

@NgModule({
    declarations: [ExpensesView],
    exports: [RouterModule],
    imports: [
        CommonModule,
        ExpensesComponentModule,
        GroupExpenseComponentModule,
        PairExpenseComponentModule,
        RouterModule.forChild(expensesRoutes),
        ServicesModule,
    ],
})
export class ExpensesViewModule {}
