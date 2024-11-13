import { ChoseContactComponent } from './chose-contact.component';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { HeadbarComponent } from '../common/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ChoseContactComponent, ContactComponent],
    imports: [CommonModule, HeadbarComponent],
})
export class ChoseContactComponentModule {}
