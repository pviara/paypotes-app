import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';
import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ContactsComponent],
    imports: [ExplorerComponentModule, HeadbarComponent],
})
export class ContactsComponentModule {}
