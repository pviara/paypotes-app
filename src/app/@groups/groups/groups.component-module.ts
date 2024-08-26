import { BrowserExplorerComponentModule } from '@shared/browser-explorer/browser-explorer.component-module';
import { CoreModule } from '@core/core.module';
import { GroupsComponent } from '@groups/groups/groups.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [GroupsComponent],
    imports: [BrowserExplorerComponentModule, CoreModule, HeadbarComponent],
})
export class GroupsComponentModule {}
