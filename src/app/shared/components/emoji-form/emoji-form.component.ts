import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormService } from '@core/services/form/form.service';

@Component({
    selector: 'emoji-form',
    templateUrl: './emoji-form.component.html',
    styleUrls: ['./emoji-form.component.scss'],
})
export class EmojiFormComponent implements OnInit {
    private formService = inject(FormService);

    form = this.formService.injectCurrentForm();

    label = 'emoji';

    @Output()
    buttonClicked = new EventEmitter<never>();

    ngOnInit(): void {
        if (!this.form.exist(this.label)) {
            this.addFormField();
        }
    }

    onButtonClicked(): void {
        this.buttonClicked.emit();
    }

    onKeyClicked(key: string): void {
        this.form.setField({ label: this.label, value: key });
    }

    private addFormField(): void {
        const VALID_EMOJI_REGEXP = /\p{Emoji}/u;
        this.form.addField({
            label: this.label,
            value: '',
            validators: [VALID_EMOJI_REGEXP],
        });
    }
}
