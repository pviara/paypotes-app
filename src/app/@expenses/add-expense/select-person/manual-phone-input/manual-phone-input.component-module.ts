import { CommonModule } from '@angular/common';
import { ManualPhoneInputComponent } from './manual-phone-input.component';
import { NgModule } from '@angular/core';
import { PhoneFormatModifierDirective } from '@shared/directives/phone-format-modifier.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ManualPhoneInputComponent],
    exports: [ManualPhoneInputComponent],
    imports: [CommonModule, PhoneFormatModifierDirective, ReactiveFormsModule],
})
export class ManualPhoneInputComponentModule {}
