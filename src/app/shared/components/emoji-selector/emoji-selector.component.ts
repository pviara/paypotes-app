import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormServiceToken } from '@core/services/form/form.service.provider';

@Component({
    selector: 'emoji-selector',
    templateUrl: './emoji-selector.component.html',
    styleUrls: ['./emoji-selector.component.scss'],
})
export class EmojiSelectorComponent implements OnInit {
    form = inject(FormServiceToken);

    label = 'emoji';

    @Output()
    buttonClicked = new EventEmitter<never>();

    @Output()
    keyClicked = new EventEmitter<string>();

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
        this.keyClicked.emit(key);
    }

    private addFormField(): void {
        const VALID_EMOJI_REGEXP = /\p{Emoji}/u;
        this.form.addField({
            label: this.label,
            value: '',
            regexps: [VALID_EMOJI_REGEXP],
        });
        this.form.focus(this.label);
    }
}
