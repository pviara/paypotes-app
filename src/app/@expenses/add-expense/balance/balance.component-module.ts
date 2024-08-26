import { BalanceComponent } from '@expenses/add-expense/balance/balance.component';
import { KeyboardComponent } from '@expenses/add-expense/balance/keyboard/keyboard.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [BalanceComponent, KeyboardComponent],
    exports: [BalanceComponent],
})
export class BalanceComponentModule {}
