import { ButtonComponent } from '@shared/form/button/button.component';
import { CommonModule } from '@angular/common';
import { HeadbarComponent } from '@shared/form/headbar/headbar.component';
import { ManualPhoneInputComponentModule } from './manual-phone-input/manual-phone-input.component-module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectPersonComponent } from './select-person.component';

@NgModule({
    declarations: [SelectPersonComponent],
    imports: [
        ButtonComponent,
        CommonModule,
        HeadbarComponent,
        ManualPhoneInputComponentModule,
        ReactiveFormsModule,
        RouterModule,
    ],
})
export class SelectPersonComponentModule {}
