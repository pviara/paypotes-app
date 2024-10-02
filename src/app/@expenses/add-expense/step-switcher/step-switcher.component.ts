import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

type AddExpenseFormGroup = FormGroup<AddExpenseForm>;

@Component({
    selector: 'step-switcher',
    templateUrl: './step-switcher.component.html',
})
export class StepSwitcherComponent {
    currentStep = input.required<string>();

    form = input.required<AddExpenseFormGroup>();
}
