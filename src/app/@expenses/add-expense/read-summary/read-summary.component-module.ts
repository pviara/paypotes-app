import { ButtonComponent } from '@shared/components/button/button.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { ReadSummaryComponent } from '@expenses/add-expense/read-summary/read-summary.component';
import { SummaryFormComponentModule } from '@shared/components/summary-form/summary-form.component-module';

@NgModule({
    declarations: [ReadSummaryComponent],
    imports: [ButtonComponent, HeadbarComponent, SummaryFormComponentModule],
})
export class ReadSummaryComponentModule {}
