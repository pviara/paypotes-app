import { AddGroupExpenseViewModule } from '@groups/add-group-expense/add-group-expense.view-module';
import { AddGroupViewModule } from '@groups/add-group/add-group.view-module';
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
                path: 'add',
                loadChildren: importAddGroupView(),
                data: { hideMenu: true },
            },
            {
                path: ':groupId/add-expense',
                loadChildren: importAddGroupExpenseView(),
                data: { hideMenu: true },
            },
            {
                path: ':groupId',
                component: GroupComponent,
                title: 'Groupe',
                data: { hideMenu: true },
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

function importAddGroupExpenseView(): () => Promise<
    typeof AddGroupExpenseViewModule
> {
    return async () => {
        const imported = await import(
            '@groups/add-group-expense/add-group-expense.view-module'
        );
        return imported.AddGroupExpenseViewModule;
    };
}
