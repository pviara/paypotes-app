import { GroupComponent } from '@groups/group/group.component';
import { GroupsComponent } from '@groups/groups/groups.component';
import { GroupsView } from '@groups/groups.view';
import { Routes } from '@angular/router';
import { AddGroupViewModule } from './add-group/add-group.view-module';

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
                path: 'add',
                loadChildren: importAddGroupView(),
            },
            {
                path: ':groupId',
                component: GroupComponent,
                title: 'Groupe',
            },
        ],
    },
];

function importAddGroupView(): () => Promise<typeof AddGroupViewModule> {
    return async () => {
        const imported = await import(
            '@groups/add-group/add-group.view-module'
        );
        return imported.AddGroupViewModule;
    };
}
