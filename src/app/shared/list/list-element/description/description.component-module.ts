import { ContactDescriptionComponent } from './contact-description/contact-description.component';
import { ContactPipe } from '@shared/list/list-element/description/pipes/contact.pipe';
import { DescriptionComponent } from './description.component';
import { ExpenseDescriptionComponent } from './expense-description/expense-description.component';
import { ExpensePipe } from '@shared/list/list-element/description/pipes/expense.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        ContactDescriptionComponent,
        ContactPipe,
        DescriptionComponent,
        ExpenseDescriptionComponent,
        ExpensePipe,
    ],
    exports: [DescriptionComponent],
})
export class DescriptionComponentModule {}
