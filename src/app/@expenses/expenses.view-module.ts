import { CoreModule } from '@core/core.module';
import { CommonModule } from '@angular/common';
import { expensesRoutes } from '@expenses/expenses.routes';
import { ExpensesView } from '@expenses/expenses.view';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { FiltersComponent } from '@shared/filters/filters.component';
import { ListComponent } from '@expenses/expenses/list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { ListElementComponentModule } from '@shared/list-element/list-element.component-module';

@NgModule({
    declarations: [ExpensesView, ExpensesComponent, ListComponent],
    exports: [RouterModule],
    imports: [
        CommonModule,
        CoreModule,
        FiltersComponent,
        HeadbarComponent,
        ListElementComponentModule,
        RouterModule.forChild(expensesRoutes),
    ],
})
export class ExpensesViewModule {}
