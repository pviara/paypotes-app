import { CommonModule } from '@angular/common';
import { ListComponent } from '@contacts/add-contact/picker-explorer/list/list.component';
import { ListElementComponentModule } from '@contacts/add-contact/picker-explorer/list/list-element/list-element.component-module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ListComponent],
    exports: [ListComponent],
    imports: [CommonModule, ListElementComponentModule],
})
export class ListComponentModule {}
