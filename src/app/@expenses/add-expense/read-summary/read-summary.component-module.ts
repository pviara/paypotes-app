import { ButtonComponent } from '../common/button/button.component';
import { HeadbarComponent } from '../common/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { ReadSummaryComponent } from './read-summary.component';
import { ExpenseImagesComponent } from '@shared/expense/images/images.component';

@NgModule({
    declarations: [ReadSummaryComponent],
    imports: [ButtonComponent, HeadbarComponent, ExpenseImagesComponent],
})
export class ReadSummaryComponentModule {}
