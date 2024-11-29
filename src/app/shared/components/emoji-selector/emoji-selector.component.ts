import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

type SelectEmojiForm = {
    emoji: FormControl<string>;
};

@Component({
    selector: 'emoji-selector',
    templateUrl: './emoji-selector.component.html',
    styleUrls: ['./emoji-selector.component.scss'],
})
export class EmojiSelectorComponent {
    private formBuilder = inject(FormBuilder);

    form = this.formBuilder.group<SelectEmojiForm>({
        emoji: this.formBuilder.nonNullable.control('', [
            Validators.required,
            Validators.pattern(/\p{Emoji}/u),
        ]),
    });

    @Output()
    buttonClicked = new EventEmitter<never>();

    @Output()
    keyClicked = new EventEmitter<string>();

    onButtonClicked(): void {
        this.buttonClicked.emit();
    }

    onKeyClicked(key: string): void {
        this.form.controls.emoji.setValue(key);
        this.keyClicked.emit(key);
    }
}
