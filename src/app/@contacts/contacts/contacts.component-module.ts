import { BrowserExplorerComponentModule } from '@shared/browser-explorer/browser-explorer.component-module';
import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ContactsComponent],
    imports: [BrowserExplorerComponentModule, HeadbarComponent],
})
export class ContactsComponentModule {}
