import { BalanceComponent } from '@shared/balance/balance.component';
import { CommonModule } from '@angular/common';
import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';
import { GroupComponent } from '@groups/group/group.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [GroupComponent],
    imports: [
        BalanceComponent,
        CommonModule,
        ExplorerComponentModule,
        HeadbarComponent,
    ],
})
export class GroupComponentModule {}
