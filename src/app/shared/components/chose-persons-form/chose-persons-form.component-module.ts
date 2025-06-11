import { ButtonComponent } from '@shared/components/button/button.component';
import { ChosePersonsFormComponent } from '@shared/components/chose-persons-form/chose-persons-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PersonComponent } from '@shared/components/chose-persons-form/person/person.component';

@NgModule({
    declarations: [ChosePersonsFormComponent, PersonComponent],
    exports: [ChosePersonsFormComponent],
    imports: [ButtonComponent, CommonModule],
})
export class ChosePersonsFormComponentModule {}
