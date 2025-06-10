import { AddGroupFormToken } from '@core/services/form/form.provider';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ChoseContactsComponent } from '@groups/add-group/chose-contacts/chose-contacts.component';
import { ChosePersonsFormComponentModule } from '@shared/components/chose-persons-form/chose-persons-form.component-module';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '@groups/add-group/chose-contacts/contact/contact.component';
import { FormService } from '@core/services/form/form.service';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SelectorFormComponentModule } from '@shared/components/selector-form/selector-form.component-module';

@NgModule({
    declarations: [ChoseContactsComponent, ContactComponent],
    imports: [
        ButtonComponent,
        ChosePersonsFormComponentModule,
        CommonModule,
        HeadbarComponent,
        SelectorFormComponentModule,
    ],
})
export class ChoseContactsComponentModule {
    constructor(private formService: FormService) {
        this.formService.use(AddGroupFormToken);
    }
}
