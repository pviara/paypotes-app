import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
    private formBuilder = inject(FormBuilder);

    form!: FormGroup<AddExpenseForm>;

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            balance: this.formBuilder.nonNullable.control(''),
            name: this.formBuilder.nonNullable.control(''),
            isCurrentPayer: this.formBuilder.nonNullable.control(false),
        });
    }

    onBalanceChange(event: Event): void {
        const { value } = event.target as HTMLInputElement;
        if (!value) {
            return;
        }

        const balance = this.removeInvalidCharacters(value);
        this.form.controls.balance.setValue(balance, { emitEvent: false });
    }

    private removeInvalidCharacters(value: string): string {
        if (value === ',') {
            return '';
        }

        const cleanedValue = value.replaceAll(
            /[a-zA-Z\u00C0-\u00FF\W\s&]/g,
            (match) => (match === ',' ? ',' : ''),
        );

        return this.containsExtraComma(cleanedValue)
            ? this.removeExtraCommaFrom(cleanedValue)
            : cleanedValue;
    }

    private containsExtraComma(cleanedValue: string): boolean {
        return (
            Array.from(cleanedValue).filter((char) => char === ',').length > 1
        );
    }

    private removeExtraCommaFrom(cleanedValue: string): string {
        const lastCommaIndex = cleanedValue.lastIndexOf(',');
        return Array.from(cleanedValue)
            .map((char, index) => (index === lastCommaIndex ? '' : char))
            .join('')
            .toString();
    }
}
