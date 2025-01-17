import { ButtonComponent } from '@shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { FillDetailsComponent } from '@groups/add-group/fill-details/fill-details.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
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
