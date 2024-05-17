import { BalanceComponent } from './balance/balance.component';
import { GroupsComponentModule } from './groups/groups.component-module';
import { HeadbarComponent } from './headbar/headbar.component';
import { LandingComponent } from './landing.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [BalanceComponent, HeadbarComponent, LandingComponent],
    imports: [GroupsComponentModule],
})
export class LandingComponentModule {}
