import { ExplorerComponent } from '@shared/explorer/explorer.component';
import { FiltersComponent } from '@shared/filters/filters.component';
import { ListComponentModule } from '@shared/list/list.component-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ExplorerComponent],
    exports: [ExplorerComponent],
    imports: [CommonModule, FiltersComponent, ListComponentModule],
})
export class ExplorerComponentModule {}
