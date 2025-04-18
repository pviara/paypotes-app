import { CommonModule } from '@angular/common';
import { ExpensesComponent } from '@home/expenses/expenses.component';
import { ListCallToActionComponentModule } from '@shared/components/explorer/list/list-call-to-action/list-call-to-action.component-module';
import { ListElementComponentModule } from '@shared/components/explorer/list/list-element/list-element.component-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ExpensesComponent],
    exports: [ExpensesComponent],
    imports: [
        CommonModule,
        ListCallToActionComponentModule,
        ListElementComponentModule,
        RouterModule,
    ],
})
export class ExpensesComponentModule {}
