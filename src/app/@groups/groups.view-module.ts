import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { GroupsComponent } from '@groups/groups/groups.component';
import { groupsRoutes } from '@groups/groups.routes';
import { GroupsView } from '@groups/groups.view';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { FiltersComponent } from '@shared/filters/filters.component';
import { ListComponentModule } from '@shared/list/list.component-module';

@NgModule({
    declarations: [GroupsComponent, GroupsView],
    exports: [RouterModule],
    imports: [
        CoreModule,
        FiltersComponent,
        HeadbarComponent,
        ListComponentModule,
        RouterModule.forChild(groupsRoutes),
    ],
})
export class GroupsViewModule {}
