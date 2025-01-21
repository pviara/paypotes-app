import { ButtonComponent } from '@shared/components/button/button.component';
import { DescriptiveImagesComponent } from '@shared/components/summary-form/descriptive-images/descriptive-images.component';
import { NgModule } from '@angular/core';
import { PayerInfoComponent } from '@shared/components/summary-form/payer-info/payer-info.component';
import { SummaryFormComponent } from '@shared/components/summary-form/summary-form.component';

@NgModule({
    declarations: [
        DescriptiveImagesComponent,
        PayerInfoComponent,
        SummaryFormComponent,
    ],
    exports: [SummaryFormComponent],
    imports: [ButtonComponent],
})
export class SummaryFormComponentModule {}
