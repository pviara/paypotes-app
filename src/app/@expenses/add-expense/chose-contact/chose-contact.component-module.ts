import { ChoseContactComponent } from '@expenses/add-expense/chose-contact/chose-contact.component';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '@expenses/add-expense/chose-contact/contact/contact.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SelectorFormComponentModule } from '@shared/components/selector-form/selector-form.component-module';

@NgModule({
    declarations: [ChoseContactComponent, ContactComponent],
    imports: [CommonModule, HeadbarComponent, SelectorFormComponentModule],
})
export class ChoseContactComponentModule {}
