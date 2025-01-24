import { ButtonComponent } from '@shared/components/button/button.component';
import { DisplayerComponent } from '@shared/components/balance-form/displayer/displayer.component';
import { KeyboardComponent } from '@shared/components/balance-form/keyboard/keyboard.component';
import { NgModule } from '@angular/core';
import { BalanceFormComponent } from '@shared/components/balance-form/balance-form.component';

@NgModule({
    declarations: [DisplayerComponent, KeyboardComponent, BalanceFormComponent],
    exports: [BalanceFormComponent],
    imports: [ButtonComponent],
})
export class BalanceFormComponentModule {}
