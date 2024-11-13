import { Routes } from '@angular/router';
import { SelectEmojiComponent } from './select-emoji/select-emoji.component';
import { SetBalanceComponent } from './set-balance/set-balance.component';

export const addExpenseRoutes: Routes = [
    {
        path: 'balance',
        component: SetBalanceComponent,
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
