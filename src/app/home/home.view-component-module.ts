import { BalanceComponent } from './balance/balance.component';
import { ExpensesComponentModule } from './expenses/expenses.component-module';
import { GroupsComponentModule } from './groups/groups.component-module';
import { HeadbarComponent } from './headbar/headbar.component';
import { HomeViewComponent } from './home.view-component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [BalanceComponent, HeadbarComponent, HomeViewComponent],
    imports: [ExpensesComponentModule, GroupsComponentModule],
})
export class HomeViewComponentModule {}
