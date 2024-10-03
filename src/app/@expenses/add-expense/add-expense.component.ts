import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import {
    AddExpenseForm,
    AddExpenseFormRawValue,
} from '@expenses/add-expense/model/add-expense-form';
import { Component, inject, OnInit } from '@angular/core';
import {
    ExpenseServiceProvider,
    ExpenseServiceToken,
} from '@core/services/expense/expense.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { NotificationService } from '@core/services/notification/notification.service';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { Router } from '@angular/router';
import { Step } from '@expenses/add-expense/model/step';
import { tap } from 'rxjs';
import { User } from '@core/model/user/user';

@Component({
    selector: 'add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.scss'],
    providers: [
        ExpenseServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class AddExpenseComponent implements OnInit {
    private expenseService = inject(ExpenseServiceToken);
    private formBuilder = inject(FormBuilder);
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    private currentStepIndex = 0;
    private readonly steps: Array<Step> = [
        'balance',
        'emoji',
        'info',
        'contact',
        'summary',
    ];

    currentStep = this.steps[this.currentStepIndex];

    form!: FormGroup<AddExpenseForm>;

    loading = false;

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            balance: this.formBuilder.nonNullable.control('', [
                Validators.required,
                Validators.minLength(1),
            ]),
            emoji: this.formBuilder.nonNullable.control('🔍', [
                Validators.required,
                this.forbiddenEmojiValidator(),
            ]),
            name: this.formBuilder.nonNullable.control('', [
                Validators.required,
                Validators.minLength(1),
            ]),
            isCurrentPayer: this.formBuilder.nonNullable.control(false),
            user: this.formBuilder.control<User | null>(null),
        });

        this.form.controls.user.valueChanges.subscribe(() => this.goNextStep());
    }

    isLoadingOrCurrentStepInvalid(): boolean {
        return this.loading || this.isCurrentStepInvalid();
    }

    onSubmit(): void {
        this.goNextStep();
    }

    private goNextStep(): void {
        const nextStep = this.steps[++this.currentStepIndex];
        if (nextStep) {
            this.currentStep = nextStep;
        } else {
            this.loading = true;
            this.addExpenseUsingFormValue();
        }
    }

    private getFormSecuredRawValue(): AddExpenseFormRawValue {
        const { user, ...values } = this.form.getRawValue();
        if (user) {
            return {
                user,
                ...values,
            };
        }
        throw new Error('User cannot be null at this stage of form submission');
    }

    private addExpenseUsingFormValue(): void {
        const formRawValue = this.getFormSecuredRawValue();
        this.expenseService
            .addExpense({
                balance: formRawValue.balance,
                userId: formRawValue.user.getId(),
                emoji: formRawValue.emoji,
                isCurrentPayer: formRawValue.isCurrentPayer,
                name: formRawValue.name,
            })
            .pipe(
                tap(() => {
                    this.notificationService.notify({
                        type: 'success',
                        message: 'Dépense ajoutée !',
                    });
                    this.router.navigate(['/expenses']);
                }),
            )
            .subscribe();
    }

    private forbiddenEmojiValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const forbidden = control.value === '🔍';
            return forbidden ? { emoji: { value: control.value } } : null;
        };
    }

    private isCurrentStepInvalid(): boolean {
        switch (this.currentStep) {
            case 'balance':
                return this.isBalanceFormStepInvalid();

            case 'emoji':
                return this.isEmojiFormStepInvalid();

            case 'info':
                return this.isInfoFormStepInvalid();

            case 'summary':
                return false;

            default:
                return true;
        }
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
