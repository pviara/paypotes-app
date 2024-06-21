import { GroupComponent } from '@groups/group/group.component';
import { GroupsComponent } from '@groups/groups/groups.component';
import { GroupsView } from '@groups/groups.view';
import { Routes } from '@angular/router';
import { ViewType } from '@core/model/view/view';

export const groupsRoutes: Routes = [
    {
        path: '',
        component: GroupsView,
        children: [
            {
                path: '',
                component: GroupsComponent,
                title: 'Groupes',
                data: { type: ViewType.List },
            },
            {
                path: ':groupId',
                component: GroupComponent,
                title: 'Groupe',
                data: { type: ViewType.Detail },
            },
        ],
    },
];
