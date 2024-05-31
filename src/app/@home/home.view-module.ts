import { BalanceComponent } from '@home/balance/balance.component';
import { ExpensesComponentModule } from '@home/expenses/expenses.component-module';
import { GroupsComponentModule } from '@home/groups/groups.component-module';
import { HeadbarComponent } from '@home/headbar/headbar.component';
import { HomeView } from '@home/home.view';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [BalanceComponent, HeadbarComponent, HomeView],
    imports: [ExpensesComponentModule, GroupsComponentModule],
})
export class HomeViewModule {}
