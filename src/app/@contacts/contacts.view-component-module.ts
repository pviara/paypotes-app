import { contactRoutes } from '@contacts/contacts.routes';
import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { ContactsViewComponent } from '@contacts/contacts.view-component';
import { FiltersComponent } from '@shared/filters/filters.component';
import { HeadbarComponent } from '@contacts/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ContactsViewComponent, ContactsComponent, HeadbarComponent],
    imports: [FiltersComponent, RouterModule.forChild(contactRoutes)],
})
export class ContactsViewComponentModule {}
