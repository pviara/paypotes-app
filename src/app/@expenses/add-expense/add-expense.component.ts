import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
            balance: this.formBuilder.nonNullable.control('', [
                Validators.required,
                Validators.minLength(1),
            ]),
            name: this.formBuilder.nonNullable.control(''),
            isCurrentPayer: this.formBuilder.nonNullable.control(false),
        });

        this.form.valueChanges.subscribe((changes) => console.log(changes));
    }
}
