import { ButtonComponent } from '@shared/components/button/button.component';
import { DisplayerComponent } from '@shared/components/emoji-form/displayer/displayer.component';
import { EmojiFormComponent } from '@shared/components/emoji-form/emoji-form.component';
import { KeyboardComponent } from '@shared/components/emoji-form/keyboard/keyboard.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    exports: [EmojiFormComponent],
    declarations: [DisplayerComponent, EmojiFormComponent, KeyboardComponent],
    imports: [ButtonComponent, ReactiveFormsModule],
})
export class EmojiFormComponentModule {}
