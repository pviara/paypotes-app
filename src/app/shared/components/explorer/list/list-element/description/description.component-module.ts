import { ContactDescriptionComponent } from '@shared/components/explorer/list/list-element/description/contact-description/contact-description.component';
import { ContactPipe } from '@shared/components/explorer/list/list-element/description/pipes/contact.pipe';
import { DescriptionComponent } from '@shared/components/explorer/list/list-element/description/description.component';
import { ExpenseDescriptionComponent } from '@shared/components/explorer/list/list-element/description/expense-description/expense-description.component';
import { GroupExpensePipe } from '@shared/components/explorer/list/list-element/description/pipes/group-expense.pipe';
import { PairExpensePipe } from '@shared/components/explorer/list/list-element/description/pipes/pair-expense.pipe';
import { GroupDescriptionComponent } from '@shared/components/explorer/list/list-element/description/group-description/group-description.component';
import { GroupPipe } from '@shared/components/explorer/list/list-element/description/pipes/group.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        ContactDescriptionComponent,
        ContactPipe,
        DescriptionComponent,
        ExpenseDescriptionComponent,
        GroupExpensePipe,
        PairExpensePipe,
        GroupDescriptionComponent,
        GroupPipe,
    ],
    exports: [DescriptionComponent],
})
export class DescriptionComponentModule {}
