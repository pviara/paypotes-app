import { ButtonComponent } from '../common/button/button.component';
import { HeadbarComponent } from '../common/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectPersonComponent } from './select-person.component';

@NgModule({
    declarations: [SelectPersonComponent],
    imports: [ButtonComponent, HeadbarComponent, ReactiveFormsModule],
})
export class SelectPersonComponentModule {}
