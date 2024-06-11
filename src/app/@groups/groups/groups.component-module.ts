import { CoreModule } from '@core/core.module';
import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';
import { GroupsComponent } from '@groups/groups/groups.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [GroupsComponent],
    imports: [CoreModule, ExplorerComponentModule],
})
export class GroupsComponentModule {}
