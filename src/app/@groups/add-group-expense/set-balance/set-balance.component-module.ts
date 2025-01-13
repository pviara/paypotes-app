import { ButtonComponent } from '@shared/components/button/button.component';
import { DisplayerComponent } from '@groups/add-group-expense/set-balance/displayer/displayer.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { KeyboardComponent } from '@groups/add-group-expense/set-balance/keyboard/keyboard.component';
import { NgModule } from '@angular/core';
import { SetBalanceComponent } from '@groups/add-group-expense/set-balance/set-balance.component';

@NgModule({
    declarations: [DisplayerComponent, KeyboardComponent, SetBalanceComponent],
    imports: [ButtonComponent, HeadbarComponent],
})
export class SetBalanceComponentModule {}
