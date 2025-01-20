import { DetailsFormComponentModule } from '@shared/components/details-form/details-form.component-module';
import { FillDetailsComponent } from '@groups/add-group-expense/fill-details/fill-details.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [FillDetailsComponent],
    imports: [DetailsFormComponentModule, HeadbarComponent],
})
export class FillDetailsComponentModule {}
