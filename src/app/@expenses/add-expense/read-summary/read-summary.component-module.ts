import { ButtonComponent } from '@shared/button/button.component';
import { ExpenseImagesComponent } from '@shared/expense/images/images.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { ReadSummaryComponent } from '@expenses/add-expense/read-summary/read-summary.component';

@NgModule({
    declarations: [ReadSummaryComponent],
    imports: [ButtonComponent, HeadbarComponent, ExpenseImagesComponent],
})
export class ReadSummaryComponentModule {}
