import { FormatDatePipe } from '@shared/pipes/format-date.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [FormatDatePipe],
    exports: [FormatDatePipe],
})
export class SharedModule {}
