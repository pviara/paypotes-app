import { BalanceComponent } from '@shared/components/balance/balance.component';
import { CommonModule } from '@angular/common';
import { ExpensesComponentModule } from '@home/expenses/expenses.component-module';
import { GroupsComponentModule } from '@home/groups/groups.component-module';
import { HeadbarComponent } from '@home/headbar/headbar.component';
import { HomeView } from '@home/home.view';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [HeadbarComponent, HomeView],
    imports: [
        BalanceComponent,
        CommonModule,
        ExpensesComponentModule,
        GroupsComponentModule,
        RouterModule,
    ],
})
export class HomeViewModule {}
