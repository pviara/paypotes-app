import { ButtonComponent } from '@shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { DetailsFormComponentModule } from '@shared/components/details-form/details-form.component-module';
import { FillDetailsComponent } from '@expenses/add-expense/fill-details/fill-details.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [FillDetailsComponent],
    imports: [
        ButtonComponent,
        CommonModule,
        DetailsFormComponentModule,
        HeadbarComponent,
    ],
})
export class FillDetailsComponentModule {}
