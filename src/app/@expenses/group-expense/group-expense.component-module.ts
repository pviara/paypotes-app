import { ActionComponent } from '@expenses/group-expense/action/action.component';
import { CommonModule } from '@angular/common';
import { ExpenseDescriptionComponent } from '@expenses/group-expense/description/description.component';
import { ExpenseHeaderComponent } from '@expenses/group-expense/header/header.component';
import { ExpenseImagesComponent } from '@expenses/group-expense/images/images.component';
import { GroupExpenseComponent } from '@expenses/group-expense/group-expense.component';
import { ExpenseSkeletonComponent } from '@expenses/group-expense/skeleton/skeleton.component';
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
        GroupExpenseComponent,
    ],
    imports: [CommonModule, HeadbarComponent, SharedModule],
})
export class GroupExpenseComponentModule {}
