import { contactRoutes } from '@contacts/contacts.routes';
import { ContactsComponentModule } from '@contacts/contacts/contacts.component-module';
import { ContactsView } from '@contacts/contacts.view';
import { CoreModule } from '@core/core.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ContactsView],
    imports: [
        ContactsComponentModule,
        CoreModule,
        RouterModule.forChild(contactRoutes),
    ],
})
export class ContactsViewModule {}
