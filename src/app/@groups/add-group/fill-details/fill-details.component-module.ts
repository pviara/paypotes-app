import { ButtonComponent } from '@shared/components/button/button.component';
import { FillDetailsComponent } from '@groups/add-group/fill-details/fill-details.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { DetailsFormComponentModule } from '@shared/components/details-form/details-form.component-module';

@NgModule({
    declarations: [FillDetailsComponent],
    imports: [ButtonComponent, DetailsFormComponentModule, HeadbarComponent],
})
export class FillDetailsComponentModule {}
