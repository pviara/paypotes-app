import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './expense/description/description.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpensesComponent } from './expenses.component';
import { NgModule } from '@angular/core';
import { TotalComponent } from './expense/total/total.component';

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
