import { ButtonComponent } from '@shared/button/button.component';
import { DisplayerComponent } from '@groups/add-group/select-emoji/displayer/displayer.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { KeyboardComponent } from '@groups/add-group/select-emoji/keyboard/keyboard.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectEmojiComponent } from '@groups/add-group/select-emoji/select-emoji.component';

@NgModule({
    declarations: [DisplayerComponent, KeyboardComponent, SelectEmojiComponent],
    imports: [ButtonComponent, HeadbarComponent, ReactiveFormsModule],
})
export class SelectEmojiComponentModule {}
