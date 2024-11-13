import { ButtonComponent } from '../button/button.component';
import { HeadbarComponent } from '../headbar/headbar.component';
import { FillDetailsComponent } from './fill-details.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [FillDetailsComponent],
    imports: [ButtonComponent, HeadbarComponent, ReactiveFormsModule],
})
export class FillDetailsComponentModule {}
