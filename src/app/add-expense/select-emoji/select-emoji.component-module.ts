import { ButtonComponent } from '../button/button.component';
import { HeadbarComponent } from '../headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SelectEmojiComponent } from './select-emoji.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KeyboardComponent } from './keyboard/keyboard.component';

@NgModule({
    declarations: [KeyboardComponent, SelectEmojiComponent],
    imports: [ButtonComponent, HeadbarComponent, ReactiveFormsModule],
})
export class SelectEmojiComponentModule {}
