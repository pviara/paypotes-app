import { ButtonComponent } from '@shared/form/button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { FillDetailsComponent } from './fill-details.component';
import { HeadbarComponent } from '@shared/form/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CheckboxComponent, FillDetailsComponent],
    imports: [
        ButtonComponent,
        CommonModule,
        HeadbarComponent,
        ReactiveFormsModule,
    ],
})
export class FillDetailsComponentModule {}
