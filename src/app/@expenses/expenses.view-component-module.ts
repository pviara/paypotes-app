import { CommonModule } from '@angular/common';
import { ExpenseComponentModule } from '@shared/expense/expense.component-module';
import { ExpensesViewComponent } from '@expenses/expenses.view-component';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { HeadbarComponent } from '@expenses/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ExpensesViewComponent, ExpensesComponent, HeadbarComponent],
    imports: [CommonModule, ExpenseComponentModule],
})
export class ExpensesViewComponentModule {}
