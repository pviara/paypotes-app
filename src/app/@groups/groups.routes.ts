import { GroupComponent } from '@groups/group/group.component';
import { GroupsComponent } from '@groups/groups/groups.component';
import { GroupsView } from '@groups/groups.view';
import { Routes } from '@angular/router';
import { AddGroupViewModule } from './add-group/add-group.view-module';
import { AddGroupExpenseViewModule } from './add-group-expense/add-group-expense.view-module';

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
                path: 'add-expense',
                loadChildren: importAddGroupExpenseView(),
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
