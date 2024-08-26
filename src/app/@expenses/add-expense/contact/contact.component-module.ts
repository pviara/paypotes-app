import { ContactComponent } from '@expenses/add-expense/contact/contact.component';
import { NgModule } from '@angular/core';
import { PhoneFormatModifierDirective } from '@shared/directives/phone-format-modifier.directive';
import { PhonePasteModifierDirective } from '@shared/directives/phone-paste-modifier.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ContactComponent],
    exports: [ContactComponent],
    imports: [
        PhoneFormatModifierDirective,
        PhonePasteModifierDirective,
        ReactiveFormsModule,
    ],
})
export class ContactComponentModule {}
