import { GroupsView } from '@groups/groups.view';
import { Routes } from '@angular/router';

export const groupsRoutes: Routes = [
    {
        path: '',
        component: GroupsView,
        children: [
            // {
            //     path: '',
            //     component: ExpensesComponent,
            //     title: 'Dépenses',
            //     data: { type: ViewType.List },
            // },
        ],
    },
];
