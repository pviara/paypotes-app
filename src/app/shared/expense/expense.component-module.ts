import { CommonModule } from '@angular/common';
import { DescriptionComponent } from '@shared/expense/description/description.component';
import { ExpenseComponent } from '@shared/expense/expense.component';
import { NgModule } from '@angular/core';
import { SkeletonComponent } from '@shared/skeleton/skeleton.component';
import { TotalComponent } from '@shared/expense/total/total.component';

@NgModule({
    declarations: [DescriptionComponent, ExpenseComponent, TotalComponent],
    exports: [ExpenseComponent],
    imports: [CommonModule, SkeletonComponent],
})
export class ExpenseComponentModule {}
