import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ContactsComponent],
    imports: [ExplorerComponentModule, HeadbarComponent],
})
export class ContactsComponentModule {}
