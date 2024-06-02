import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';
import { FiltersComponent } from '@shared/filters/filters.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { GroupsComponent } from '@groups/groups/groups.component';
import { groupsRoutes } from '@groups/groups.routes';
import { GroupsView } from '@groups/groups.view';
import { ListComponentModule } from '@shared/list/list.component-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';

@NgModule({
    declarations: [GroupsComponent, GroupsView],
    exports: [RouterModule],
    imports: [
        CoreModule,
        ExplorerComponentModule,
        FiltersComponent,
        HeadbarComponent,
        ListComponentModule,
        RouterModule.forChild(groupsRoutes),
    ],
})
export class GroupsViewModule {}
