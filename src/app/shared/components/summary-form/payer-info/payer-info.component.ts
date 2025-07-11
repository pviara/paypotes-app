import { Component, computed, input } from '@angular/core';
import { FormContext } from '@core/model/form/form-context';

@Component({
    selector: 'payer-info',
    templateUrl: './payer-info.component.html',
    styleUrls: ['./payer-info.component.scss'],
    standalone: false,
})
export class PayerInfoComponent {
    context = input.required<FormContext>();
    currentContextIsExpense = computed(() => this.context() === 'expense');

    fullname = input.required<string>();

    isCurrentPayer = input.required<boolean>();
}
