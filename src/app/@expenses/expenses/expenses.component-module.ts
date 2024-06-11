import { CoreModule } from '@core/core.module';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ExpensesComponent],
    imports: [CoreModule, ExplorerComponentModule],
})
export class ExpensesComponentModule {}
