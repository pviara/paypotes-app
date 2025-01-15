import { ChoseContactComponent } from '@expenses/add-expense/chose-contact/chose-contact.component';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '@expenses/add-expense/chose-contact/contact/contact.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ChoseContactComponent, ContactComponent],
    imports: [CommonModule, HeadbarComponent],
})
export class ChoseContactComponentModule {}
