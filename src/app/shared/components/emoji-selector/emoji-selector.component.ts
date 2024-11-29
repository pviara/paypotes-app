import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupBuilder } from '@core/model/form/form-group-builder';
import { FormServiceToken } from '@core/services/form/form.service.provider';

@Component({
    selector: 'emoji-selector',
    templateUrl: './emoji-selector.component.html',
    styleUrls: ['./emoji-selector.component.scss'],
})
export class EmojiSelectorComponent implements OnInit {
    private form = inject(FormServiceToken);

    label = 'emoji';
    formGroup!: FormGroup;

    @Output()
    buttonClicked = new EventEmitter<never>();

    @Output()
    keyClicked = new EventEmitter<string>();

    ngOnInit(): void {
        if (this.form.exists(this.label)) {
            this.initFormGroup();
        } else {
            this.addFormField();
            this.initFormGroup();
        }
    }

    onButtonClicked(): void {
        this.buttonClicked.emit();
    }

    onKeyClicked(key: string): void {
        this.form.setField({ label: this.label, value: key });
        this.formGroup.controls[this.label].setValue(key);
        this.keyClicked.emit(key);
    }

    private initFormGroup(): void {
        this.formGroup = new FormGroupBuilder(this.form).build();
    }

    private addFormField(): void {
        const VALID_EMOJI_REGEXP = /\p{Emoji}/u;
        this.form.addField({
            label: this.label,
            value: '',
            regexps: [VALID_EMOJI_REGEXP],
        });
    }
}
