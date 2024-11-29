import { ButtonComponent } from '@shared/components/button/button.component';
import { DisplayerComponent } from '@expenses/add-expense/set-balance/displayer/displayer.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { KeyboardComponent } from '@expenses/add-expense/set-balance/keyboard/keyboard.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SetBalanceComponent } from '@expenses/add-expense/set-balance/set-balance.component';

@NgModule({
    declarations: [DisplayerComponent, KeyboardComponent, SetBalanceComponent],
    imports: [ButtonComponent, HeadbarComponent, ReactiveFormsModule],
})
export class SetBalanceComponentModule {}
