import { AddExpenseComponent } from '@expenses/add-expense/add-expense.component';
import { ButtonComponentModule } from '@expenses/add-expense/button/button.component-module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StepSwitcherComponentModule } from '@expenses/add-expense/step-switcher/step-switcher.component-module';

@NgModule({
    declarations: [AddExpenseComponent],
    imports: [
        ButtonComponentModule,
        CommonModule,
        ReactiveFormsModule,
        StepSwitcherComponentModule,
    ],
})
export class AddExpenseComponentModule {}
