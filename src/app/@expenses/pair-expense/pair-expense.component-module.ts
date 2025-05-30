import { ActionComponent } from '@expenses/pair-expense/action/action.component';
import { CommonModule } from '@angular/common';
import { ExpenseDescriptionComponent } from '@expenses/pair-expense/description/description.component';
import { ExpenseHeaderComponent } from '@expenses/pair-expense/header/header.component';
import { ExpenseImagesComponent } from '@expenses/pair-expense/images/images.component';
import { PairExpenseComponent } from '@expenses/pair-expense/pair-expense.component';
import { ExpenseSkeletonComponent } from '@expenses/pair-expense/skeleton/skeleton.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [
        ActionComponent,
        ExpenseDescriptionComponent,
        ExpenseHeaderComponent,
        ExpenseImagesComponent,
        ExpenseSkeletonComponent,
        PairExpenseComponent,
    ],
    imports: [CommonModule, HeadbarComponent, SharedModule],
})
export class PairExpenseComponentModule {}
