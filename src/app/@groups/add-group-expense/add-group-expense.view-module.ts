import { AddGroupExpenseFormToken } from '@core/services/form/form.provider';
import { addGroupExpenseRoutes } from '@groups/add-group-expense/add-group-expense.routes';
import { AddGroupExpenseView } from '@groups/add-group-expense/add-group-expense.view';
import { ChoseMemberComponentModule } from '@groups/add-group-expense/chose-member/chose-member.component-module';
import { FillDetailsComponentModule } from '@groups/add-group-expense/fill-details/fill-details.component-module';
import { FormService } from '@core/services/form/form.service';
import { NgModule } from '@angular/core';
import { ReadSummaryComponentModule } from '@groups/add-group-expense/read-summary/read-summary.component-module';
import { RouterModule } from '@angular/router';
import { SelectEmojiComponentModule } from '@groups/add-group-expense/select-emoji/select-emoji.component-module';
import { SetBalanceComponentModule } from '@groups/add-group-expense/set-balance/set-balance.component-module';

@NgModule({
    declarations: [AddGroupExpenseView],
    imports: [
        ChoseMemberComponentModule,
        FillDetailsComponentModule,
        ReadSummaryComponentModule,
        RouterModule.forChild(addGroupExpenseRoutes),
        SelectEmojiComponentModule,
        SetBalanceComponentModule,
    ],
})
export class AddGroupExpenseViewModule {
    constructor(private formService: FormService) {
        this.formService.use(AddGroupExpenseFormToken);
    }
}
