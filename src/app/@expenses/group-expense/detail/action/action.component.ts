import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { ConfettiService } from '@core/services/confetti/confetti.service';

@Component({
    selector: 'group-expense-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss'],
})
export class ActionComponent {
    private confettiService = inject(ConfettiService);

    clicked = false;

    isDebt = input.required<boolean>();

    @Output()
    payback = new EventEmitter<never>();

    onClick(): void {
        this.clicked = true;
        if (this.isDebt()) {
            this.confettiService.pan();
        }
        this.payback.emit();
    }
}
