import { ButtonComponent } from '@shared/components/button/button.component';
import { CheckboxComponent } from '@shared/components/details-form/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { DetailsFormComponent } from '@shared/components/details-form/details-form.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [CheckboxComponent, DetailsFormComponent],
    exports: [DetailsFormComponent],
    imports: [ButtonComponent, CommonModule],
})
export class DetailsFormComponentModule {}
