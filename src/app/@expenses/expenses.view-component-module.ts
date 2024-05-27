import { CoreModule } from '@core/core.module';
import { CommonModule } from '@angular/common';
import { ExpenseComponentModule } from '@shared/expense/expense.component-module';
import { expensesRoutes } from '@expenses/expenses.routes';
import { ExpensesViewComponent } from '@expenses/expenses.view-component';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { FiltersComponent } from '@shared/filters/filters.component';
import { HeadbarComponent } from '@expenses/headbar/headbar.component';
import { ListComponent } from '@expenses/expenses/list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ExpensesViewComponent,
        ExpensesComponent,
        HeadbarComponent,
        ListComponent,
    ],
    exports: [RouterModule],
    imports: [
        CommonModule,
        CoreModule,
        ExpenseComponentModule,
        FiltersComponent,
        RouterModule.forChild(expensesRoutes),
    ],
})
export class ExpensesViewComponentModule {}
