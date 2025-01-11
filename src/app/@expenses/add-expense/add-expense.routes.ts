import { FillDetailsComponent } from '../../shared/components/fill-details/fill-details.component';
import { Routes } from '@angular/router';
import { SelectEmojiComponent } from './select-emoji/select-emoji.component';
import { SetBalanceComponent } from './set-balance/set-balance.component';
import { SelectPersonComponent } from './select-person/select-person.component';
import { ChoseContactComponent } from './chose-contact/chose-contact.component';
import { ReadSummaryComponent } from './read-summary/read-summary.component';

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
