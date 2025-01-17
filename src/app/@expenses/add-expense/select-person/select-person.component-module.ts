import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { PersonFormComponentModule } from '@shared/components/person-form/person-form.component-module';
import { SelectPersonComponent } from '@expenses/add-expense/select-person/select-person.component';

@NgModule({
    declarations: [SelectPersonComponent],
    imports: [HeadbarComponent, PersonFormComponentModule],
})
export class SelectPersonComponentModule {}
