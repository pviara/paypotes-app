import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { Component, input } from '@angular/core';

type EmojiFormControl = AddExpenseForm['emoji'];
type IsCurrentPayerFormControl = AddExpenseForm['isCurrentPayer'];
type NameFormControl = AddExpenseForm['name'];

@Component({
    selector: 'info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
    checkboxClicked = false;

    emoji = input.required<EmojiFormControl>();
    isCurrentPayer = input.required<IsCurrentPayerFormControl>();
    name = input.required<NameFormControl>();

    onCheckboxClicked(): void {
        this.checkboxClicked = !this.checkboxClicked;
        this.isCurrentPayer().setValue(this.checkboxClicked);
    }

    onNameChange(event: any): void {
        this.name().setValue(event.target.value);
    }
}
