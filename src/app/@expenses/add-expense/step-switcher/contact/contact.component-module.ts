import { ContactComponent } from '@expenses/add-expense/step-switcher/contact/contact.component';
import { NgModule } from '@angular/core';
import { PhoneFormatModifierDirective } from '@shared/directives/phone-format-modifier.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ContactComponent],
    exports: [ContactComponent],
    imports: [PhoneFormatModifierDirective, ReactiveFormsModule],
})
export class ContactComponentModule {}
