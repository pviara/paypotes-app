import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ExpensesComponent],
    imports: [ExplorerComponentModule, HeadbarComponent],
})
export class ExpensesComponentModule {}
