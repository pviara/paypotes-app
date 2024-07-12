import { BalanceComponent } from '@contacts/add-contact/picker-explorer/list/list-element/balance/balance.component';
import { CommonModule } from '@angular/common';
import { DescriptionComponentModule } from '@contacts/add-contact/picker-explorer/list/list-element/description/description.component-module';
import { ListElementComponent } from '@contacts/add-contact/picker-explorer/list/list-element/list-element.component';
import { NgModule } from '@angular/core';
import { SkeletonComponent } from '@contacts/add-contact/picker-explorer/list/list-element/skeleton/skeleton.component';

@NgModule({
    declarations: [BalanceComponent, ListElementComponent, SkeletonComponent],
    exports: [ListElementComponent, BalanceComponent],
    imports: [CommonModule, DescriptionComponentModule],
})
export class ListElementComponentModule {}
