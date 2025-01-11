import { ButtonComponent } from '@shared/components/button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { FillDetailsComponent } from './fill-details.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [CheckboxComponent, FillDetailsComponent],
    imports: [ButtonComponent, CommonModule, HeadbarComponent],
})
export class FillDetailsComponentModule {}
