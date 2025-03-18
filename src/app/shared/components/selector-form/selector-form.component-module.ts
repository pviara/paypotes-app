import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PersonComponent } from '@shared/components/selector-form/person/person.component';
import { SelectorFormComponent } from '@shared/components/selector-form/selector-form.component';

@NgModule({
    declarations: [PersonComponent, SelectorFormComponent],
    exports: [SelectorFormComponent],
    imports: [CommonModule],
})
export class SelectorFormComponentModule {}
