import { BalanceComponent } from '@shared/balance/balance.component';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from '@shared/expense/description/description.component';
import { ExpenseComponent } from '@shared/expense/expense.component';
import { NgModule } from '@angular/core';
import { SkeletonComponent } from '@shared/skeleton/skeleton.component';

@NgModule({
    declarations: [DescriptionComponent, ExpenseComponent],
    exports: [ExpenseComponent],
    imports: [BalanceComponent, CommonModule, SkeletonComponent],
})
export class ExpenseComponentModule {}
