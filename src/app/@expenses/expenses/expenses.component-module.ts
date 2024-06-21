import { CoreModule } from '@core/core.module';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ExpensesComponent],
    imports: [CoreModule, ExplorerComponentModule, HeadbarComponent],
})
export class ExpensesComponentModule {}
