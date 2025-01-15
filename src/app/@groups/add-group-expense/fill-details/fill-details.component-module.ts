import { ButtonComponent } from '@shared/components/button/button.component';
import { CheckboxComponent } from '@groups/add-group-expense/fill-details/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { FillDetailsComponent } from '@groups/add-group-expense/fill-details/fill-details.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [CheckboxComponent, FillDetailsComponent],
    imports: [ButtonComponent, CommonModule, HeadbarComponent],
})
export class FillDetailsComponentModule {}
