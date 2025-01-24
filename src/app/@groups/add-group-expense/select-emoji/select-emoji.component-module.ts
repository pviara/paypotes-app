import { EmojiFormComponentModule } from '@shared/components/emoji-form/emoji-form.component-module';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SelectEmojiComponent } from '@groups/add-group-expense/select-emoji/select-emoji.component';

@NgModule({
    declarations: [SelectEmojiComponent],
    imports: [EmojiFormComponentModule, HeadbarComponent],
})
export class SelectEmojiComponentModule {}
