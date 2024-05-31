import { CommonModule } from '@angular/common';
import { ListComponent } from '@shared/list/list.component';
import { ListElementComponentModule } from '@shared/list-element/list-element.component-module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ListComponent],
    exports: [ListComponent],
    imports: [CommonModule, ListElementComponentModule],
})
export class ListComponentModule {}
