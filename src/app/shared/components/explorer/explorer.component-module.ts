import { ExplorerComponent } from '@shared/components/explorer/explorer.component';
import { FiltersComponent } from '@shared/components/explorer/filters/filters.component';
import { ListComponentModule } from '@shared/components/explorer/list/list.component-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ExplorerComponent],
    exports: [ExplorerComponent],
    imports: [CommonModule, FiltersComponent, ListComponentModule],
})
export class ExplorerComponentModule {}
