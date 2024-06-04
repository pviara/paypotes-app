import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { ExpenseComponent } from '@expenses/expense/expense.component';
import { ExpenseDescriptionComponent } from '@expenses/expense/description/description.component';
import { ExpenseHeaderComponent } from '@expenses/expense/header/header.component';
import { ExpenseImagesComponent } from '@expenses/expense/images/images.component';
import { ExpenseSkeletonComponent } from '@expenses/expense/skeleton/skeleton.component';
import { expensesRoutes } from '@expenses/expenses.routes';
import { ExpensesView } from '@expenses/expenses.view';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [
        ExpenseDescriptionComponent,
        ExpenseHeaderComponent,
        ExpenseImagesComponent,
        ExpenseSkeletonComponent,
        ExpensesView,
        ExpenseComponent,
        ExpensesComponent,
    ],
    exports: [RouterModule],
    imports: [
        CommonModule,
        CoreModule,
        ExplorerComponentModule,
        HeadbarComponent,
        RouterModule.forChild(expensesRoutes),
        SharedModule,
    ],
})
export class ExpensesViewModule {}
