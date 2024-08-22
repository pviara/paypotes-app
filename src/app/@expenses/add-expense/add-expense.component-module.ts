import { AddExpenseComponent } from '@expenses/add-expense/add-expense.component';
import { BalanceComponentModule } from '@expenses/add-expense/balance/balance.component-module';
import { CommonModule } from '@angular/common';
import { EmojiComponentModule } from '@expenses/add-expense/emoji/emoji.component-module';
import { InfoComponentModule } from '@expenses/add-expense/info/info-component.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AddExpenseComponent],
    imports: [
        BalanceComponentModule,
        CommonModule,
        EmojiComponentModule,
        InfoComponentModule,
        ReactiveFormsModule,
    ],
})
export class AddExpenseComponentModule {}
