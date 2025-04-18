import { FormatDatePipe } from '@shared/pipes/format-date.pipe';
import { NgModule } from '@angular/core';
import { ConfettiService } from '@core/services/confetti/confetti.service';

@NgModule({
    declarations: [FormatDatePipe],
    exports: [FormatDatePipe],
    providers: [ConfettiService],
})
export class SharedModule {}
