import { ContactComponent } from '@expenses/add-expense/contact/contact.component';
import { NgModule } from '@angular/core';
import { PhonePasteModifierDirective } from '@shared/directives/phone-paste-modifier.directive';

@NgModule({
    declarations: [ContactComponent],
    exports: [ContactComponent],
    imports: [PhonePasteModifierDirective],
})
export class ContactComponentModule {}
