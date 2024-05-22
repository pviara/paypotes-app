import { BalanceComponent } from './balance/balance.component';
import { ExpensesComponentModule } from './expenses/expenses.component-module';
import { GroupsComponentModule } from './groups/groups.component-module';
import { HeadbarComponent } from './headbar/headbar.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [BalanceComponent, HeadbarComponent, HomeComponent],
    imports: [ExpensesComponentModule, GroupsComponentModule],
})
export class HomeComponentModule {}
