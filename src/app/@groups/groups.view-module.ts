import { groupsRoutes } from '@groups/groups.routes';
import { GroupComponentModule } from '@groups/group/group.component-module';
import { GroupsComponentModule } from '@groups/groups/groups.component-module';
import { GroupsView } from '@groups/groups.view';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [GroupsView],
    exports: [RouterModule],
    imports: [
        GroupsComponentModule,
        GroupComponentModule,
        RouterModule.forChild(groupsRoutes),
    ],
})
export class GroupsViewModule {}
