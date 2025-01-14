import { FillDetailsComponent } from '@groups/add-group-expense/fill-details/fill-details.component';
import { Routes } from '@angular/router';
import { SelectEmojiComponent } from '@groups/add-group-expense/select-emoji/select-emoji.component';
import { SetBalanceComponent } from '@groups/add-group-expense/set-balance/set-balance.component';
import { ChoseMemberComponent } from './chose-member/chose-member.component';

export const addGroupExpenseRoutes: Routes = [
    {
        path: 'balance',
        component: SetBalanceComponent,
    },
    {
        path: 'details',
        component: FillDetailsComponent,
    },
    {
        path: 'emoji',
        component: SelectEmojiComponent,
    },
    {
        path: 'member',
        component: ChoseMemberComponent,
    },
    {
        path: '**',
        redirectTo: 'balance',
    },
];
