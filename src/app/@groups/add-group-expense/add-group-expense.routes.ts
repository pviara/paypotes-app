import { ChoseMemberComponent } from '@groups/add-group-expense/chose-member/chose-member.component';
import { FillDetailsComponent } from '@groups/add-group-expense/fill-details/fill-details.component';
import { ReadSummaryComponent } from '@groups/add-group-expense/read-summary/read-summary.component';
import { Routes } from '@angular/router';
import { SelectEmojiComponent } from '@groups/add-group-expense/select-emoji/select-emoji.component';
import { SetBalanceComponent } from '@groups/add-group-expense/set-balance/set-balance.component';

export const addGroupExpenseRoutes: Routes = [
    {
        path: 'balance',
        component: SetBalanceComponent,
    },
    {
        path: 'emoji',
        component: SelectEmojiComponent,
    },
    {
        path: 'details',
        component: FillDetailsComponent,
    },
    {
        path: 'member',
        component: ChoseMemberComponent,
    },
    {
        path: 'summary',
        component: ReadSummaryComponent,
    },
];
