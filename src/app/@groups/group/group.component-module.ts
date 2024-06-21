import { BalanceComponent } from '@shared/balance/balance.component';
import { CommonModule } from '@angular/common';
import { GroupComponent } from '@groups/group/group.component';
import { NgModule } from '@angular/core';
import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';

@NgModule({
    declarations: [GroupComponent],
    imports: [BalanceComponent, CommonModule, ExplorerComponentModule],
})
export class GroupComponentModule {}
