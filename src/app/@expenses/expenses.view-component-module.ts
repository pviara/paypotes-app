import { ExpensesViewComponent } from '@expenses/expenses.view-component';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { HeadbarComponent } from '@expenses/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ExpensesViewComponent, ExpensesComponent, HeadbarComponent],
})
export class ExpensesViewComponentModule {}
