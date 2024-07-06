import { AddContactComponent } from '@contacts/add-contact/add-contact.component';
import { HeadbarComponent } from '@contacts/add-contact/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AddContactComponent, HeadbarComponent],
    imports: [RouterModule],
})
export class AddContactComponentModule {}
