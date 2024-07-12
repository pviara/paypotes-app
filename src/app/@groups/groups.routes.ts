import { GroupComponent } from '@groups/group/group.component';
import { GroupsComponent } from '@groups/groups/groups.component';
import { GroupsView } from '@groups/groups.view';
import { Routes } from '@angular/router';

export const groupsRoutes: Routes = [
    {
        path: '',
        component: GroupsView,
        children: [
            {
                path: '',
                component: GroupsComponent,
                title: 'Groupes',
            },
            {
                path: ':groupId',
                component: GroupComponent,
                title: 'Groupe',
            },
        ],
    },
];
