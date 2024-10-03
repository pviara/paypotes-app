import { BalanceComponentModule } from '@expenses/add-expense/step-switcher/balance/balance.component-module';
import { CommonModule } from '@angular/common';
import { ContactComponentModule } from '@expenses/add-expense/step-switcher/contact/contact.component-module';
import { EmojiComponentModule } from '@expenses/add-expense/step-switcher/emoji/emoji.component-module';
import { InfoComponentModule } from '@expenses/add-expense/step-switcher/info/info-component.module';
import { NgModule } from '@angular/core';
import { RecapComponentModule } from '@expenses/add-expense/step-switcher/recap/recap.component-module';
import { StepSwitcherComponent } from '@expenses/add-expense/step-switcher/step-switcher.component';

@NgModule({
    declarations: [StepSwitcherComponent],
    exports: [StepSwitcherComponent],
    imports: [
        BalanceComponentModule,
        CommonModule,
        ContactComponentModule,
        EmojiComponentModule,
        InfoComponentModule,
        RecapComponentModule,
    ],
})
export class StepSwitcherComponentModule {}
