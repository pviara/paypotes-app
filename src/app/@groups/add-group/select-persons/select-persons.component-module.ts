import { CommonModule } from '@angular/common';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { ManualPhoneInputComponentModule } from '@shared/components/manual-phone-input/manual-phone-input.component-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectPersonsComponent } from '@groups/add-group/select-persons/select-persons.component';

@NgModule({
    declarations: [SelectPersonsComponent],
    imports: [
        CommonModule,
        HeadbarComponent,
        ManualPhoneInputComponentModule,
        RouterModule,
    ],
})
export class SelectPersonsComponentModule {}
