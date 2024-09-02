import { ContactDescriptionComponent } from '@shared/explorer/list/list-element/description/contact-description/contact-description.component';
import { ContactPipe } from '@shared/explorer/list/list-element/description/pipes/contact.pipe';
import { DescriptionComponent } from '@shared/explorer/list/list-element/description/description.component';
import { ExpenseDescriptionComponent } from '@shared/explorer/list/list-element/description/expense-description/expense-description.component';
import { ExpensePipe } from '@shared/explorer/list/list-element/description/pipes/expense.pipe';
import { GroupDescriptionComponent } from '@shared/explorer/list/list-element/description/group-description/group-description.component';
import { GroupPipe } from '@shared/explorer/list/list-element/description/pipes/group.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        ContactDescriptionComponent,
        ContactPipe,
        DescriptionComponent,
        ExpenseDescriptionComponent,
        ExpensePipe,
        GroupDescriptionComponent,
        GroupPipe,
    ],
    exports: [DescriptionComponent],
})
export class DescriptionComponentModule {}
