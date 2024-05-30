import { CommonModule } from '@angular/common';
import { ContactComponent } from '@contacts/contacts/list/contact/contact.component';
import { contactRoutes } from '@contacts/contacts.routes';
import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { ContactsViewComponent } from '@contacts/contacts.view-component';
import { CoreModule } from '@core/core.module';
import { FiltersComponent } from '@shared/filters/filters.component';
import { HeadbarComponent } from '@contacts/headbar/headbar.component';
import { ListComponent } from '@contacts/contacts/list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkeletonComponent } from '@shared/skeleton/skeleton.component';

@NgModule({
    declarations: [
        ContactComponent,
        ContactsViewComponent,
        ContactsComponent,
        HeadbarComponent,
        ListComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        FiltersComponent,
        RouterModule.forChild(contactRoutes),
        SkeletonComponent,
    ],
})
export class ContactsViewComponentModule {}
