import { HeadbarComponent } from '../headbar/headbar.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SetBalanceComponent } from './set-balance.component';

@NgModule({
    declarations: [KeyboardComponent, SetBalanceComponent],
    imports: [HeadbarComponent, ReactiveFormsModule],
})
export class SetBalanceComponentModule {}
