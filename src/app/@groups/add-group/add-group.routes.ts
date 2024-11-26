import { FillDetailsComponent } from '@groups/add-group/fill-details/fill-details.component';
import { Routes } from '@angular/router';

export const addGroupRoutes: Routes = [
    {
        path: 'details',
        component: FillDetailsComponent,
    },
    {
        path: '**',
        redirectTo: 'details',
    },
];
