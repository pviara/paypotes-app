import { AddContactComponentModule } from '@contacts/add-contact/add-contact.component-module';
import { ContactComponentModule } from '@contacts/contact/contact.component-module';
import { contactRoutes } from '@contacts/contacts.routes';
import { ContactsComponentModule } from '@contacts/contacts/contacts.component-module';
import { ContactsView } from '@contacts/contacts.view';
import { CoreModule } from '@core/core.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ContactsView],
    imports: [
        AddContactComponentModule,
        ContactComponentModule,
        ContactsComponentModule,
        CoreModule,
        RouterModule.forChild(contactRoutes),
    ],
})
export class ContactsViewModule {}
