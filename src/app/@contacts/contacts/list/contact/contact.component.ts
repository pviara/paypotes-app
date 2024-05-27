import { Component, input } from '@angular/core';
import { Contact } from '@core/model/contact/contact';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    contact = input.required<Contact | null>();

    isLoading = input.required<boolean>();
}
