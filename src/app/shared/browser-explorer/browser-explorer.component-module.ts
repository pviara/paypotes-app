import { BrowserExplorerComponent } from '@shared/browser-explorer/browser-explorer.component';
import { FiltersComponent } from '@shared/browser-explorer/filters/filters.component';
import { ListComponentModule } from '@shared/browser-explorer/list/list.component-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [BrowserExplorerComponent],
    exports: [BrowserExplorerComponent],
    imports: [CommonModule, FiltersComponent, ListComponentModule],
})
export class BrowserExplorerComponentModule {}
