import { EmojiComponent } from '@expenses/add-expense/emoji/emoji.component';
import { KeyboardComponent } from '@expenses/add-expense/emoji/keyboard/keyboard.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [EmojiComponent, KeyboardComponent],
    exports: [EmojiComponent],
})
export class EmojiComponentModule {}
