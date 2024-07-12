import { AddContactComponent } from '@contacts/add-contact/add-contact.component';
import { HeadbarComponent } from '@contacts/add-contact/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { PickerExplorerComponentModule } from '@contacts/add-contact/picker-explorer/picker-explorer.component-module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AddContactComponent, HeadbarComponent],
    imports: [PickerExplorerComponentModule, ReactiveFormsModule, RouterModule],
})
export class AddContactComponentModule {}
