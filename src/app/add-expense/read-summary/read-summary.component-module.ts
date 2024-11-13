import { ButtonComponent } from '../common/button/button.component';
import { HeadbarComponent } from '../common/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { ReadSummaryComponent } from './read-summary.component';

@NgModule({
    declarations: [ReadSummaryComponent],
    imports: [ButtonComponent, HeadbarComponent],
})
export class ReadSummaryComponentModule {}
