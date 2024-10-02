import { AddExpenseForm } from '@expenses/add-expense/model/add-expense-form';
import { Component, input } from '@angular/core';

type EmojiFormControl = AddExpenseForm['emoji'];

@Component({
    selector: 'emoji',
    templateUrl: './emoji.component.html',
    styleUrls: ['./emoji.component.scss'],
})
export class EmojiComponent {
    emoji = input.required<EmojiFormControl>();

    onKeyClicked(key: string): void {
        this.emoji().setValue(key);
    }
}
