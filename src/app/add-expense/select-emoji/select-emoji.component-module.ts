import { HeadbarComponent } from '../headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SelectEmojiComponent } from './select-emoji.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [SelectEmojiComponent],
    imports: [HeadbarComponent, ReactiveFormsModule],
})
export class SelectEmojiComponentModule {}
