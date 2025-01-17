import { ButtonComponent } from '@shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { ManualPhoneInputComponentModule } from '@shared/components/manual-phone-input/manual-phone-input.component-module';
import { NgModule } from '@angular/core';
import { PersonFormComponent } from '@shared/components/person-form/person-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [PersonFormComponent],
    exports: [PersonFormComponent],
    imports: [
        ButtonComponent,
        CommonModule,
        ManualPhoneInputComponentModule,
        RouterModule,
    ],
})
export class PersonFormComponentModule {}
