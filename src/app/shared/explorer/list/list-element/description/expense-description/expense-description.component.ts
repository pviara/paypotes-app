import { Component, computed, input } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { Emoji } from '@core/model/emoji';

@Component({
    selector: 'expense-description',
    templateUrl: './expense-description.component.html',
    styleUrls: ['./expense-description.component.scss'],
})
export class ExpenseDescriptionComponent {
    emoji = input.required<Emoji>();

    label = input.required<string>();

    origin = input.required<Contact>();

    prefix = computed(() => (this.isDebt() ? 'à' : 'de'));

    isDebt = input.required<boolean>();
}
