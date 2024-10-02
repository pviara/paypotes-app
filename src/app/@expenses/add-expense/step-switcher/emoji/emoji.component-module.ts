import { EmojiComponent } from '@expenses/add-expense/step-switcher/emoji/emoji.component';
import { KeyboardComponent } from '@expenses/add-expense/step-switcher/emoji/keyboard/keyboard.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [EmojiComponent, KeyboardComponent],
    exports: [EmojiComponent],
    imports: [ReactiveFormsModule],
})
export class EmojiComponentModule {}
