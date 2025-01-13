import { FillDetailsComponent } from '@groups/add-group-expense/fill-details/fill-details.component';
import { Routes } from '@angular/router';
import { SelectEmojiComponent } from '@groups/add-group-expense/select-emoji/select-emoji.component';
import { SetBalanceComponent } from '@groups/add-group-expense/set-balance/set-balance.component';

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
        path: '**',
        redirectTo: 'balance',
    },
];
