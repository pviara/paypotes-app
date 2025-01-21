import { ButtonComponent } from '@shared/components/button/button.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { ReadSummaryComponent } from '@groups/add-group/read-summary/read-summary.component';

@NgModule({
    declarations: [ReadSummaryComponent],
    imports: [ButtonComponent, HeadbarComponent],
})
export class ReadSummaryComponentModule {}
