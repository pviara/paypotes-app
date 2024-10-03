import { CommonModule } from '@angular/common';
import { InfoComponent } from '@expenses/add-expense/step-switcher/info/info.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [InfoComponent],
    exports: [InfoComponent],
    imports: [CommonModule],
})
export class InfoComponentModule {}
