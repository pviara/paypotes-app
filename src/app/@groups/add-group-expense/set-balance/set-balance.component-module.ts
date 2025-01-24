import { BalanceFormComponentModule } from '@shared/components/balance-form/balance-form.component-module';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SetBalanceComponent } from '@groups/add-group-expense/set-balance/set-balance.component';

@NgModule({
    declarations: [SetBalanceComponent],
    imports: [BalanceFormComponentModule, HeadbarComponent],
})
export class SetBalanceComponentModule {}
