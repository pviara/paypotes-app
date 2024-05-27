import { CommonModule } from '@angular/common';
import { ExpenseComponentModule } from '@shared/expense/expense.component-module';
import { ExpensesComponent } from '@home/expenses/expenses.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ExpensesComponent],
    exports: [ExpensesComponent],
    imports: [CommonModule, ExpenseComponentModule],
})
export class ExpensesComponentModule {}
