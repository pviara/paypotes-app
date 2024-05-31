import { BalanceComponent } from '@shared/list/list-element/balance/balance.component';
import { CommonModule } from '@angular/common';
import { DescriptionComponentModule } from '@shared/list/list-element/description/description.component-module';
import { ListElementComponent } from '@shared/list/list-element/list-element.component';
import { NgModule } from '@angular/core';
import { SkeletonComponent } from '@shared/list/list-element/skeleton/skeleton.component';

@NgModule({
    declarations: [BalanceComponent, ListElementComponent, SkeletonComponent],
    exports: [ListElementComponent],
    imports: [CommonModule, DescriptionComponentModule],
})
export class ListElementComponentModule {}
