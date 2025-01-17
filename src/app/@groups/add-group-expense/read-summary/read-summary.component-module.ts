import { ButtonComponent } from '@shared/components/button/button.component';
import { ExpenseImagesComponent } from '@shared/components/expense/images/images.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { ReadSummaryComponent } from '@groups/add-group-expense/read-summary/read-summary.component';

@NgModule({
    declarations: [ReadSummaryComponent],
    imports: [ButtonComponent, HeadbarComponent, ExpenseImagesComponent],
})
export class ReadSummaryComponentModule {}
