import { CommonModule } from '@angular/common';
import { ManualPhoneInputComponent } from '@shared/components/person-form/manual-phone-input/manual-phone-input.component';
import { NgModule } from '@angular/core';
import { PhoneFormatModifierDirective } from '@shared/directives/phone-format-modifier.directive';

@NgModule({
    declarations: [ManualPhoneInputComponent],
    exports: [ManualPhoneInputComponent],
    imports: [CommonModule, PhoneFormatModifierDirective],
})
export class ManualPhoneInputComponentModule {}
