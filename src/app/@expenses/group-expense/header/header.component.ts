import { Component, input } from '@angular/core';
import { Contact } from '@core/model/contact/contact';

@Component({
    selector: 'group-expense-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class ExpenseHeaderComponent {
    date = input.required<Date>();
    counterparty = input.required<Contact>();
}
