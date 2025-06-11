import { Component, input } from '@angular/core';
import { Group } from '@core/model/group/group';

@Component({
    selector: 'group-expense-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class ExpenseHeaderComponent {
    date = input.required<Date>();
    group = input.required<Group>();
}
