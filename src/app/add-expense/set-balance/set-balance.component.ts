import { BalanceFormatter } from '@expenses/add-expense/step-switcher/balance/model/balance-formatter';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

type SetBalanceForm = {
    balance: FormControl<string>;
};

@Component({
    selector: 'set-balance',
    templateUrl: './set-balance.component.html',
    styleUrls: ['./set-balance.component.scss'],
})
export class SetBalanceComponent {
    private formBuilder = inject(FormBuilder);

    form = this.formBuilder.group<SetBalanceForm>({
        balance: this.formBuilder.nonNullable.control(''),
    });

    formatter = new BalanceFormatter();

    onKeyClicked(key: unknown): void {
        if (typeof key === 'string') {
            this.formatter.append(key);
            this.form.controls.balance.setValue(this.formatter.getBalance());
        }
    }
}
