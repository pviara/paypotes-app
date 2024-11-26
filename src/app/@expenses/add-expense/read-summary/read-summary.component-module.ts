import { ButtonComponent } from '@shared/form/button/button.component';
import { ExpenseImagesComponent } from '@shared/expense/images/images.component';
import { HeadbarComponent } from '@shared/form/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { ReadSummaryComponent } from './read-summary.component';

@NgModule({
    declarations: [ReadSummaryComponent],
    imports: [ButtonComponent, HeadbarComponent, ExpenseImagesComponent],
})
export class ReadSummaryComponentModule {}
