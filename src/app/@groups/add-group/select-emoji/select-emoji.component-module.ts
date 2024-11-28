import { EmojiSelectorComponentModule } from '@shared/emoji-selector/emoji-selector.component-module';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SelectEmojiComponent } from '@groups/add-group/select-emoji/select-emoji.component';

@NgModule({
    declarations: [SelectEmojiComponent],
    imports: [EmojiSelectorComponentModule, HeadbarComponent],
})
export class SelectEmojiComponentModule {}
