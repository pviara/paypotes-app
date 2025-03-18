import { ChoseUserFromSearchComponent } from '@expenses/add-expense/chose-user-from-search/chose-user-from-search.component';
import { FillDetailsComponent } from '@expenses/add-expense/fill-details/fill-details.component';
import { Routes } from '@angular/router';
import { SelectEmojiComponent } from '@expenses/add-expense/select-emoji/select-emoji.component';
import { SetBalanceComponent } from '@expenses/add-expense/set-balance/set-balance.component';
import { ChoseContactComponent } from '@expenses/add-expense/chose-contact/chose-contact.component';
import { ReadSummaryComponent } from '@expenses/add-expense/read-summary/read-summary.component';
import { SelectPersonComponent } from '@expenses/add-expense/select-person/select-person.component';

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
        path: 'details',
        component: FillDetailsComponent,
    },
    {
        path: 'person',
        component: SelectPersonComponent,
    },
    {
        path: 'search',
        component: ChoseUserFromSearchComponent,
    },
    {
        path: 'contact',
        component: ChoseContactComponent,
    },
    {
        path: 'summary',
        component: ReadSummaryComponent,
    },
    {
        path: '**',
        redirectTo: 'balance',
    },
];
