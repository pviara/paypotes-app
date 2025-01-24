import { AddGroupExpenseViewModule } from '@groups/add-group-expense/add-group-expense.view-module';
import { GroupComponentModule } from '@groups/group/group.component-module';
import { GroupsComponentModule } from '@groups/groups/groups.component-module';
import { groupsRoutes } from '@groups/groups.routes';
import { GroupsView } from '@groups/groups.view';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesModule } from '@core/services/services.module';

@NgModule({
    declarations: [GroupsView],
    exports: [RouterModule],
    imports: [
        GroupsComponentModule,
        GroupComponentModule,
        RouterModule.forChild(groupsRoutes),
        ServicesModule,
    ],
})
export class GroupsViewModule {}
