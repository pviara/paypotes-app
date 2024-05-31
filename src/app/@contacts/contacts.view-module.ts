import { BalanceComponent } from '@shared/balance/balance.component';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '@contacts/contacts/list/contact/contact.component';
import { contactRoutes } from '@contacts/contacts.routes';
import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { ContactsView } from '@contacts/contacts.view';
import { CoreModule } from '@core/core.module';
import { DescriptionComponent } from '@contacts/contacts/list/contact/description/description.component';
import { FiltersComponent } from '@shared/filters/filters.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { ListComponent } from '@contacts/contacts/list/list.component';
import { ListElementComponent } from '@shared/list-element/list-element.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkeletonComponent } from '@shared/skeleton/skeleton.component';

@NgModule({
    declarations: [
        ContactComponent,
        ContactsComponent,
        ContactsView,
        DescriptionComponent,
        ListComponent,
    ],
    imports: [
        BalanceComponent,
        CommonModule,
        CoreModule,
        FiltersComponent,
        HeadbarComponent,
        ListElementComponent,
        RouterModule.forChild(contactRoutes),
        SkeletonComponent,
    ],
})
export class ContactsComponentModule {}
