import { Component, computed, input } from '@angular/core';
import { Contact } from '@core/model/contact/contact';

@Component({
    selector: 'expense-description',
    templateUrl: './expense-description.component.html',
    styleUrls: ['./expense-description.component.scss'],
})
export class ExpenseDescriptionComponent {
    emoji = input.required<string>();

    label = input.required<string>();

    counterparty = input.required<Contact>();

    prefix = computed(() => (this.isDebt() ? 'à' : 'de'));

    isDebt = input.required<boolean>();
}
