import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { GroupsComponent } from '@groups/groups/groups.component';
import { groupsRoutes } from '@groups/groups.routes';
import { GroupsView } from '@groups/groups.view';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';

@NgModule({
    declarations: [GroupsComponent, GroupsView],
    exports: [RouterModule],
    imports: [
        CoreModule,
        HeadbarComponent,
        RouterModule.forChild(groupsRoutes),
    ],
})
export class GroupsViewModule {}
