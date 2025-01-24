import { BalanceFormatter } from '@shared/components/balance-form/model/balance-formatter';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Form } from '@core/model/form/form';
import { FormService } from '@core/services/form/form.service';

@Component({
    selector: 'balance-form',
    templateUrl: './balance-form.component.html',
    styleUrls: ['./balance-form.component.scss'],
})
export class BalanceFormComponent implements OnInit {
    private formService = inject(FormService);

    form = this.injectCurrentForm();

    label = 'balance';
    formatter = new BalanceFormatter();

    @Output()
    buttonClicked = new EventEmitter<never>();

    ngOnInit(): void {
        this.initForm();
    }

    onButtonClicked(): void {
        this.buttonClicked.emit();
    }

    onKeyClicked(key: string): void {
        this.formatter.append(key);
        const balance = this.formatter.getBalance();

        this.form.setField({ label: this.label, value: balance });
    }

    private injectCurrentForm(): Form {
        const currentFormToken = this.formService.getUsedForm();
        return inject(currentFormToken);
    }

    private initForm(): void {
        if (!this.form.exist(this.label)) this.addFormField();
    }

    private addFormField(): void {
        const VALID_BALANCE_RANGE_REGEXP = /^(?:\d{1,2}|\d{1,2},\d{1,2})$/;
        this.form.addField({
            label: this.label,
            value: '',
            validators: [VALID_BALANCE_RANGE_REGEXP],
        });
    }
}
