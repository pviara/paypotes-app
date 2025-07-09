import { CommonModule } from '@angular/common';
import { ExpensesComponentModule } from '@expenses/expenses/expenses.component-module';
import { expensesRoutes } from '@expenses/expenses.routes';
import { ExpensesView } from '@expenses/expenses.view';
import { GroupExpenseViewModule } from '@expenses/group-expense/group-expense.view-module';
import { GroupExpenseViewService } from '@expenses/group-expense/group-expense.view-service';
import { NgModule } from '@angular/core';
import { PairExpenseComponentModule } from '@expenses/pair-expense/pair-expense.component-module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ExpensesView],
    exports: [RouterModule],
    imports: [
        CommonModule,
        ExpensesComponentModule,
        GroupExpenseViewModule,
        PairExpenseComponentModule,
        RouterModule.forChild(expensesRoutes),
    ],
    providers: [GroupExpenseViewService],
})
export class ExpensesViewModule {}
