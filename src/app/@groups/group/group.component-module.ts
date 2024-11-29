import { BalanceComponent } from '@shared/components/balance/balance.component';
import { ExplorerComponentModule } from '@shared/components/explorer/explorer.component-module';
import { CommonModule } from '@angular/common';
import { GroupComponent } from '@groups/group/group.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [GroupComponent],
    imports: [
        BalanceComponent,
        ExplorerComponentModule,
        CommonModule,
        HeadbarComponent,
    ],
})
export class GroupComponentModule {}
