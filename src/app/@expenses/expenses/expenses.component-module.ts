import { BrowserExplorerComponentModule } from '@shared/browser-explorer/browser-explorer.component-module';
import { CoreModule } from '@core/core.module';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ExpensesComponent],
    imports: [BrowserExplorerComponentModule, CoreModule, HeadbarComponent],
})
export class ExpensesComponentModule {}
