import { ButtonComponent } from '@shared/form/button/button.component';
import { DisplayerComponent } from './displayer/displayer.component';
import { HeadbarComponent } from '@shared/form/headbar/headbar.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SetBalanceComponent } from './set-balance.component';

@NgModule({
    declarations: [DisplayerComponent, KeyboardComponent, SetBalanceComponent],
    imports: [ButtonComponent, HeadbarComponent, ReactiveFormsModule],
})
export class SetBalanceComponentModule {}
