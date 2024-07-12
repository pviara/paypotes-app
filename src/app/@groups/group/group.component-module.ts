import { BalanceComponent } from '@shared/balance/balance.component';
import { BrowserExplorerComponentModule } from '@shared/browser-explorer/browser-explorer.component-module';
import { CommonModule } from '@angular/common';
import { GroupComponent } from '@groups/group/group.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [GroupComponent],
    imports: [
        BalanceComponent,
        BrowserExplorerComponentModule,
        CommonModule,
        HeadbarComponent,
    ],
})
export class GroupComponentModule {}
