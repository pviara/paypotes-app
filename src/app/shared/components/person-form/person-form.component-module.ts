import { ButtonComponent } from '@shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { ManualPhoneInputComponentModule } from '@shared/components/person-form/manual-phone-input/manual-phone-input.component-module';
import { ManualNameInputComponentModule } from '@shared/components/person-form/manual-name-input/manual-name-input.component-module';
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
        ManualNameInputComponentModule,
        RouterModule,
    ],
})
export class PersonFormComponentModule {}
