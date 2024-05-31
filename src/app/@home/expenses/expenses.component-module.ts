import { CommonModule } from '@angular/common';
import { ExpensesComponent } from '@home/expenses/expenses.component';
import { ListElementComponentModule } from '@shared/list/list-element/list-element.component-module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ExpensesComponent],
    exports: [ExpensesComponent],
    imports: [CommonModule, ListElementComponentModule],
})
export class ExpensesComponentModule {}
