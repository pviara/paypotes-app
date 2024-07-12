import { PickerExplorerComponent } from '@contacts/add-contact/picker-explorer/picker-explorer.component';
import { FiltersComponent } from '@contacts/add-contact/picker-explorer/filters/filters.component';
import { ListComponentModule } from '@contacts/add-contact/picker-explorer/list/list.component-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [PickerExplorerComponent],
    exports: [PickerExplorerComponent],
    imports: [CommonModule, FiltersComponent, ListComponentModule],
})
export class PickerExplorerComponentModule {}
