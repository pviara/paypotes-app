import { ExpenseComponentModule } from '@expenses/expense/expense.component-module';
import { ExpensesComponentModule } from '@expenses/expenses/expenses.component-module';
import { expensesRoutes } from '@expenses/expenses.routes';
import { ExpensesView } from '@expenses/expenses.view';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ExpensesView],
    exports: [RouterModule],
    imports: [
        ExpenseComponentModule,
        ExpensesComponentModule,
        HeadbarComponent,
        RouterModule.forChild(expensesRoutes),
    ],
})
export class ExpensesViewModule {}
