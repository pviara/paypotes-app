import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Field } from '@core/model/form/form';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormControlBuilder } from '@core/model/form/form-control-builder';
import { FormServiceToken } from '@core/services/form/form.service.provider';

type SelectEmojiForm = {
    [x: string]: FormControl<string>;
};

const VALID_EMOJI_REGEXP = /\p{Emoji}/u;

@Component({
    selector: 'emoji-selector',
    templateUrl: './emoji-selector.component.html',
    styleUrls: ['./emoji-selector.component.scss'],
})
export class EmojiSelectorComponent implements OnInit {
    private form = inject(FormServiceToken);
    private formBuilder = inject(FormBuilder);

    label = 'emoji';

    formGroup = this.formBuilder.group<SelectEmojiForm>({});

    @Output()
    buttonClicked = new EventEmitter<never>();

    @Output()
    keyClicked = new EventEmitter<string>();

    ngOnInit(): void {
        this.initForm();
    }

    onButtonClicked(): void {
        this.buttonClicked.emit();
    }

    onKeyClicked(key: string): void {
        this.form.setField({ label: this.label, value: key });
        this.formGroup.controls[this.label].setValue(key);
        this.keyClicked.emit(key);
    }

    private initForm(): void {
        if (this.form.exists(this.label)) {
            const field = this.form.getFieldFrom(this.label);
            this.setFormControlFor(field);
        } else {
            const field = this.addFormField();
            this.setFormControlFor(field);
        }
    }

    private setFormControlFor(field: Field): void {
        const control = new FormControlBuilder(field).build();
        this.formGroup.setControl(this.label, control);
    }

    private addFormField(): Field {
        return this.form.addField({
            label: this.label,
            value: '',
            regexps: [VALID_EMOJI_REGEXP],
        });
    }
}
