import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddGroupFormService } from '../add-group.form-service';

type SelectEmojiForm = {
    emoji: FormControl<string>;
};

@Component({
    selector: 'select-emoji',
    templateUrl: './select-emoji.component.html',
    styleUrls: ['./select-emoji.component.scss'],
})
export class SelectEmojiComponent {
    private formBuilder = inject(FormBuilder);
    private formService = inject(AddGroupFormService);
    private router = inject(Router);

    form = this.formBuilder.group<SelectEmojiForm>({
        emoji: this.formBuilder.nonNullable.control('', [
            Validators.required,
            Validators.pattern(/\p{Emoji}/u),
        ]),
    });

    onButtonClicked(): void {
        if (this.form.controls.emoji.valid) {
            this.router.navigate(['expenses', 'add', 'details']);
        }
    }

    onKeyClicked(key: string): void {
        this.form.controls.emoji.setValue(key);
        this.formService.setEmoji(key);
    }
}
