import { CoreModule } from '@core/core.module';
import { CommonModule } from '@angular/common';
import { expensesRoutes } from '@expenses/expenses.routes';
import { ExpensesView } from '@expenses/expenses.view';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { FiltersComponent } from '@shared/filters/filters.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { ListElementComponentModule } from '@shared/list-element/list-element.component-module';
import { ListComponentModule } from '@shared/list/list.component-module';

@NgModule({
    declarations: [ExpensesView, ExpensesComponent],
    exports: [RouterModule],
    imports: [
        CommonModule,
        CoreModule,
        FiltersComponent,
        HeadbarComponent,
        ListComponentModule,
        ListElementComponentModule,
        RouterModule.forChild(expensesRoutes),
    ],
})
export class ExpensesViewModule {}
