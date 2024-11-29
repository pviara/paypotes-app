import { ExplorerComponentModule } from '@shared/components/explorer/explorer.component-module';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ExpensesComponent],
    imports: [ExplorerComponentModule, HeadbarComponent],
})
export class ExpensesComponentModule {}
