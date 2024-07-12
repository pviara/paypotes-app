import { AddContactComponent } from '@contacts/add-contact/add-contact.component';
import { HeadbarComponent } from '@contacts/add-contact/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { PhonePasteModifierDirective } from '@shared/directives/phone-paste-modifier.directive';
import { PickerExplorerComponentModule } from '@contacts/add-contact/picker-explorer/picker-explorer.component-module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AddContactComponent, HeadbarComponent],
    imports: [
        PhonePasteModifierDirective,
        PickerExplorerComponentModule,
        ReactiveFormsModule,
        RouterModule,
    ],
})
export class AddContactComponentModule {}
