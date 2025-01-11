import { FillDetailsComponent } from '@groups/add-group-expense/fill-details/fill-details.component';
import { Routes } from '@angular/router';

export const addGroupExpenseRoutes: Routes = [
    {
        path: 'details',
        component: FillDetailsComponent,
    },
    {
        path: '**',
        redirectTo: 'details',
    },
];
