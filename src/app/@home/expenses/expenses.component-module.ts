import { CommonModule } from '@angular/common';
import { DescriptionComponent } from '@home/expenses/expense/description/description.component';
import { ExpenseComponent } from '@home/expenses/expense/expense.component';
import { ExpensesComponent } from '@home/expenses/expenses.component';
import { NgModule } from '@angular/core';
import { TotalComponent } from '@home/expenses/expense/total/total.component';

@NgModule({
    declarations: [
        DescriptionComponent,
        ExpenseComponent,
        ExpensesComponent,
        TotalComponent,
    ],
    exports: [ExpensesComponent],
    imports: [CommonModule],
})
export class ExpensesComponentModule {}
