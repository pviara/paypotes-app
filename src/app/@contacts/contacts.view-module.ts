import { contactRoutes } from '@contacts/contacts.routes';
import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { ContactsView } from '@contacts/contacts.view';
import { CoreModule } from '@core/core.module';
import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ContactsComponent, ContactsView],
    imports: [
        CoreModule,
        ExplorerComponentModule,
        HeadbarComponent,
        RouterModule.forChild(contactRoutes),
    ],
})
export class ContactsComponentModule {}
