import {
    Component,
    computed,
    EventEmitter,
    input,
    Output,
} from '@angular/core';
import { Step } from '@expenses/add-expense/model/step';

@Component({
    selector: 'form-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    currentStep = input.required<Step>();
    disabled = input.required<boolean>();
    mustBeHidden = computed(() => this.currentStep() === 'contact');

    @Output()
    clicked = new EventEmitter<never>();

    isCurrentStepSummary(): boolean {
        return this.currentStep() === 'summary';
    }

    onClicked(): void {
        this.clicked.emit();
    }
}
