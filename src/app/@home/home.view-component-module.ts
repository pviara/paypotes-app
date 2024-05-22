import { BalanceComponent } from '@home/balance/balance.component';
import { ExpensesComponentModule } from '@home/expenses/expenses.component-module';
import { GroupsComponentModule } from '@home/groups/groups.component-module';
import { HeadbarComponent } from '@home/headbar/headbar.component';
import { HomeViewComponent } from '@home/home.view-component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [BalanceComponent, HeadbarComponent, HomeViewComponent],
    imports: [ExpensesComponentModule, GroupsComponentModule],
})
export class HomeViewComponentModule {}
