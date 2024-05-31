import { CommonModule } from '@angular/common';
import { contactRoutes } from '@contacts/contacts.routes';
import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { ContactsView } from '@contacts/contacts.view';
import { CoreModule } from '@core/core.module';
import { FiltersComponent } from '@shared/filters/filters.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { ListComponentModule } from '@shared/list/list.component-module';
import { ListElementComponentModule } from '@shared/list/list-element/list-element.component-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ContactsComponent, ContactsView],
    imports: [
        CommonModule,
        CoreModule,
        FiltersComponent,
        HeadbarComponent,
        ListComponentModule,
        ListElementComponentModule,
        RouterModule.forChild(contactRoutes),
    ],
})
export class ContactsComponentModule {}
