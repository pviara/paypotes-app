import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
    selector: 'expense-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss'],
})
export class ActionComponent {
    clicked = false;

    isDebt = input.required<boolean>();

    @Output()
    payback = new EventEmitter<never>();

    onClick(): void {
        this.clicked = true;
        this.payback.emit();
    }
}
