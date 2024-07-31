import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

type AddExpenseForm = {
    balance: FormControl<string>;
    name: FormControl<string>;
    isCurrentPayer: FormControl<boolean>;
};

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
            balance: this.formBuilder.nonNullable.control('00,00'),
            name: this.formBuilder.nonNullable.control(''),
            isCurrentPayer: this.formBuilder.nonNullable.control(false),
        });
    }
}
