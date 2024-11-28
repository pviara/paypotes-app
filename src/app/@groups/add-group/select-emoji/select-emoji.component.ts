import { AddGroupFormService } from '@groups/add-group/add-group.form-service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
            this.router.navigate(['group', 'add', 'person']);
        }
    }

    onKeyClicked(key: string): void {
        console.log(key);
        this.form.controls.emoji.setValue(key);
        this.formService.setEmoji(key);
    }
}
