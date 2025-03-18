import { ManualNameInputComponent } from '@shared/components/person-form/manual-name-input/manual-name-input.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ManualNameInputComponent],
    exports: [ManualNameInputComponent],
    imports: [ReactiveFormsModule],
})
export class ManualNameInputComponentModule {}
