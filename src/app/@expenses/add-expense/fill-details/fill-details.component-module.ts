import { ButtonComponent } from '../common/button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { HeadbarComponent } from '../common/headbar/headbar.component';
import { FillDetailsComponent } from './fill-details.component';
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
