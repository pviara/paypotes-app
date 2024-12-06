import { ExplorerComponentModule } from '@shared/components/explorer/explorer.component-module';
import { GroupsComponent } from '@groups/groups/groups.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [GroupsComponent],
    imports: [ExplorerComponentModule, HeadbarComponent],
})
export class GroupsComponentModule {}
