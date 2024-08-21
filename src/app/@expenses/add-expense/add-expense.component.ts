import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { Component, inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';

type Step = 'balance' | 'emoji' | 'info' | 'contact' | 'summary';

@Component({
    selector: 'add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
    private formBuilder = inject(FormBuilder);

    private currentStepIndex = 1;
    private readonly steps: Array<Step> = [
        'balance',
        'emoji',
        'info',
        'contact',
        'summary',
    ];

    currentStep = this.steps[this.currentStepIndex];

    form!: FormGroup<AddExpenseForm>;

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            balance: this.formBuilder.nonNullable.control('', [
                Validators.required,
                Validators.minLength(1),
            ]),
            name: this.formBuilder.nonNullable.control('', [
                Validators.required,
            ]),
            emoji: this.formBuilder.nonNullable.control('🔍', [
                Validators.required,
                this.forbiddenEmojiValidator(),
            ]),
            isCurrentPayer: this.formBuilder.nonNullable.control(false),
        });
    }

    isCurrentFormStepInvalid(): boolean {
        switch (this.currentStep) {
            case 'balance':
                return this.isBalanceFormStepInvalid();

            case 'emoji':
                return this.isEmojiFormStepInvalid();

            case 'info':
                return this.isInfoFormStepInvalid();

            default:
                return true;
        }
    }

    onSubmit(): void {
        const nextStep = this.steps[this.currentStepIndex + 1];
        if (nextStep) {
            this.currentStep = nextStep;
        }
    }

    private forbiddenEmojiValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const forbidden = control.value === '🔍';
            return forbidden ? { emoji: { value: control.value } } : null;
        };
    }

    private isBalanceFormStepInvalid(): boolean {
        const { balance } = this.form.controls;
        return balance.invalid;
    }

    private isEmojiFormStepInvalid(): boolean {
        const { emoji } = this.form.controls;
        return emoji.invalid;
    }

    private isInfoFormStepInvalid(): boolean {
        const { emoji, isCurrentPayer, name } = this.form.controls;
        return name.invalid && emoji.invalid && isCurrentPayer.invalid;
    }
}
