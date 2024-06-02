import { CoreModule } from '@core/core.module';
import { CommonModule } from '@angular/common';
import { expensesRoutes } from '@expenses/expenses.routes';
import { ExpensesView } from '@expenses/expenses.view';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ExpensesView, ExpensesComponent],
    exports: [RouterModule],
    imports: [
        CommonModule,
        CoreModule,
        ExplorerComponentModule,
        HeadbarComponent,
        RouterModule.forChild(expensesRoutes),
    ],
})
export class ExpensesViewModule {}
