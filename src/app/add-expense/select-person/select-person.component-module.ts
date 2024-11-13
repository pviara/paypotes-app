import { ButtonComponent } from '../common/button/button.component';
import { CommonModule } from '@angular/common';
import { HeadbarComponent } from '../common/headbar/headbar.component';
import { ManualPhoneInputComponentModule } from './manual-phone-input/manual-phone-input.component-module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectPersonComponent } from './select-person.component';

@NgModule({
    declarations: [SelectPersonComponent],
    imports: [
        ButtonComponent,
        CommonModule,
        HeadbarComponent,
        ManualPhoneInputComponentModule,
        ReactiveFormsModule,
    ],
})
export class SelectPersonComponentModule {}
