import { Component, computed, input } from '@angular/core';
import { ContactV2 } from '@core/model/contact/v2/contact';

@Component({
    selector: 'expense-description',
    templateUrl: './expense-description.component.html',
    styleUrls: ['./expense-description.component.scss'],
})
export class ExpenseDescriptionComponent {
    emoji = input.required<string>();

    label = input.required<string>();

    origin = input.required<ContactV2>();

    prefix = computed(() => (this.isDebt() ? 'à' : 'de'));

    isDebt = input.required<boolean>();
}
