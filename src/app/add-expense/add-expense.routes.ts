import { Routes } from '@angular/router';
import { SetBalanceComponent } from './set-balance/set-balance.component';

export const addExpenseRoutes: Routes = [
    {
        path: 'balance',
        component: SetBalanceComponent,
    },
    {
        path: '**',
        redirectTo: 'balance',
    },
];
