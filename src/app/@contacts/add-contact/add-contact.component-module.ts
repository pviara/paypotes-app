import { AddContactComponent } from '@contacts/add-contact/add-contact.component';
import { HeadbarComponent } from '@contacts/add-contact/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { PhonePasteModifierDirective } from '@shared/directives/phone-paste-modifier.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AddContactComponent, HeadbarComponent],
    imports: [PhonePasteModifierDirective, ReactiveFormsModule, RouterModule],
})
export class AddContactComponentModule {}
