import { AddExpenseComponent } from '@expenses/add-expense/add-expense.component';
import { BalanceComponent } from '@expenses/add-expense/balance/balance.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AddExpenseComponent, BalanceComponent],
    imports: [ReactiveFormsModule],
})
export class AddExpenseComponentModule {}
