import { Component, input } from '@angular/core';

@Component({
    selector: 'expense-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss'],
})
export class ActionComponent {
    isDebt = input.required<boolean>();
}
