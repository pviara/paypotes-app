import { ButtonComponent } from '@shared/button/button.component';
import { CommonModule } from '@angular/common';
import { FillDetailsComponent } from './fill-details.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [FillDetailsComponent],
    imports: [
        ButtonComponent,
        CommonModule,
        HeadbarComponent,
        ReactiveFormsModule,
    ],
})
export class FillDetailsComponentModule {}
