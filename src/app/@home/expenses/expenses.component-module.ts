import { CommonModule } from '@angular/common';
import { ExpensesComponent } from '@home/expenses/expenses.component';
import { ListElementComponentModule } from '@shared/browser-explorer/list/list-element/list-element.component-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ExpensesComponent],
    exports: [ExpensesComponent],
    imports: [CommonModule, ListElementComponentModule, RouterModule],
})
export class ExpensesComponentModule {}
