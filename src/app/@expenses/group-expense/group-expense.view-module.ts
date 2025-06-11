import { ActionComponent } from '@expenses/group-expense/detail/action/action.component';
import { CommonModule } from '@angular/common';
import { ExpenseDescriptionComponent } from '@expenses/group-expense/detail/description/description.component';
import { ExpenseHeaderComponent } from '@expenses/group-expense/detail/header/header.component';
import { ExpenseImagesComponent } from '@expenses/group-expense/detail/images/images.component';
import { ExpenseSkeletonComponent } from '@expenses/group-expense/detail/skeleton/skeleton.component';
import { GroupExpenseChoseMembersComponent } from '@expenses/group-expense/chose-members/group-expense-chose-members.component';
import { GroupExpenseDetailComponent } from '@expenses/group-expense/detail/group-expense-detail.component';
import { groupExpenseRoutes } from '@expenses/group-expense/group-expense.routes';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ChosePersonsFormComponentModule } from '../../shared/components/chose-persons-form/chose-persons-form.component-module';
import { FormService } from '@core/services/form/form.service';
import { PaybackGroupExpenseFormToken } from '@core/services/form/form.provider';
import { ServicesModule } from '@core/services/services.module';

@NgModule({
    declarations: [
        ActionComponent,
        ExpenseDescriptionComponent,
        ExpenseHeaderComponent,
        ExpenseImagesComponent,
        ExpenseSkeletonComponent,
        GroupExpenseChoseMembersComponent,
        GroupExpenseDetailComponent,
    ],
    imports: [
        CommonModule,
        HeadbarComponent,
        RouterModule.forChild(groupExpenseRoutes),
        SharedModule,
        ChosePersonsFormComponentModule,
        ServicesModule,
    ],
})
export class GroupExpenseViewModule {
    constructor(private formService: FormService) {
        this.formService.use(PaybackGroupExpenseFormToken);
    }
}
