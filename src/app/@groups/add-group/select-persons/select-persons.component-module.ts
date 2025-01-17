import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { PersonFormComponentModule } from '@shared/components/person-form/person-form.component-module';
import { RouterModule } from '@angular/router';
import { SelectPersonsComponent } from '@groups/add-group/select-persons/select-persons.component';

@NgModule({
    declarations: [SelectPersonsComponent],
    imports: [HeadbarComponent, PersonFormComponentModule, RouterModule],
})
export class SelectPersonsComponentModule {}
