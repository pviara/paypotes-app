import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { ReadSummaryComponent } from '@groups/add-group-expense/read-summary/read-summary.component';
import { SummaryFormComponentModule } from '@shared/components/summary-form/summary-form.component-module';

@NgModule({
    declarations: [ReadSummaryComponent],
    imports: [HeadbarComponent, SummaryFormComponentModule],
})
export class ReadSummaryComponentModule {}
