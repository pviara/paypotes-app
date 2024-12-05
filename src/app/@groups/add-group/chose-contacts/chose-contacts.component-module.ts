import { ButtonComponent } from '@shared/components/button/button.component';
import { ChoseContactsComponent } from '@groups/add-group/chose-contacts/chose-contacts.component';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '@groups/add-group/chose-contacts/contact/contact.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ChoseContactsComponent, ContactComponent],
    imports: [ButtonComponent, CommonModule, HeadbarComponent],
})
export class ChoseContactsComponentModule {}
