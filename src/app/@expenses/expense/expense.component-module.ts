import { ActionComponent } from '@expenses/expense/action/action.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { ExpenseDescriptionComponent } from '@expenses/expense/description/description.component';
import { ExpenseHeaderComponent } from '@expenses/expense/header/header.component';
import { ExpenseImagesComponent } from '@expenses/expense/images/images.component';
import { ExpenseComponent } from '@expenses/expense/expense.component';
import { ExpenseSkeletonComponent } from '@expenses/expense/skeleton/skeleton.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [
        ActionComponent,
        ExpenseDescriptionComponent,
        ExpenseHeaderComponent,
        ExpenseImagesComponent,
        ExpenseSkeletonComponent,
        ExpenseComponent,
    ],
    imports: [CommonModule, CoreModule, HeadbarComponent, SharedModule],
})
export class ExpenseComponentModule {}
