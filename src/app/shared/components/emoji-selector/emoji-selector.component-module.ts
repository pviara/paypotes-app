import { ButtonComponent } from '@shared/components/button/button.component';
import { DisplayerComponent } from '@shared/components/emoji-selector/displayer/displayer.component';
import { EmojiSelectorComponent } from '@shared/components/emoji-selector/emoji-selector.component';
import { KeyboardComponent } from '@shared/components/emoji-selector/keyboard/keyboard.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    exports: [EmojiSelectorComponent],
    declarations: [
        DisplayerComponent,
        EmojiSelectorComponent,
        KeyboardComponent,
    ],
    imports: [ButtonComponent, ReactiveFormsModule],
})
export class EmojiSelectorComponentModule {}
