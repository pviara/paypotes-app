import { Component, input } from '@angular/core';
import { ContactV2 } from '@core/model/contact/contact';

@Component({
    selector: 'expense-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class ExpenseHeaderComponent {
    date = input.required<Date>();
    origin = input.required<ContactV2>();
}
