import { CommonModule } from '@angular/common';
import { ExpensesComponent } from './expenses.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ExpensesComponent],
    exports: [ExpensesComponent],
    imports: [CommonModule],
})
export class ExpensesComponentModule {}
