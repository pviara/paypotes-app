import { ButtonComponent } from '@shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { ManualPhoneInputComponentModule } from '@expenses/add-expense/select-person/manual-phone-input/manual-phone-input.component-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectPersonComponent } from './select-person.component';

@NgModule({
    declarations: [SelectPersonComponent],
    imports: [
        ButtonComponent,
        CommonModule,
        HeadbarComponent,
        ManualPhoneInputComponentModule,
        RouterModule,
    ],
})
export class SelectPersonComponentModule {}
