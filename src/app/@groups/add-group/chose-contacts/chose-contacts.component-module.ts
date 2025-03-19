import { ButtonComponent } from '@shared/components/button/button.component';
import { ChoseContactsComponent } from '@groups/add-group/chose-contacts/chose-contacts.component';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '@groups/add-group/chose-contacts/contact/contact.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SelectorFormComponentModule } from '@shared/components/selector-form/selector-form.component-module';

@NgModule({
    declarations: [ChoseContactsComponent, ContactComponent],
    imports: [
        ButtonComponent,
        CommonModule,
        HeadbarComponent,
        SelectorFormComponentModule,
    ],
})
export class ChoseContactsComponentModule {}
