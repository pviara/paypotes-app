import { FillDetailsComponent } from '@groups/add-group-expense/fill-details/fill-details.component';
import { Routes } from '@angular/router';
import { SelectEmojiComponent } from '@groups/add-group-expense/select-emoji/select-emoji.component';

export const addGroupExpenseRoutes: Routes = [
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
        redirectTo: 'details',
    },
];
