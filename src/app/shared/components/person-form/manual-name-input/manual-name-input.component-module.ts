import { ManualNameInputComponent } from '@shared/components/person-form/manual-name-input/manual-name-input.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ManualNameInputComponent],
    exports: [ManualNameInputComponent],
    imports: [CommonModule, ReactiveFormsModule],
})
export class ManualNameInputComponentModule {}
