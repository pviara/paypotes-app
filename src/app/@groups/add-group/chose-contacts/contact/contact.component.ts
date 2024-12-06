import { Component, EventEmitter, input, Output } from '@angular/core';
import { Contact } from '@core/model/contact/contact';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    contact = input.required<Contact>();
    last = input<boolean>(false);
    selected = input<boolean>(false);

    @Output()
    contactSelected = new EventEmitter<Contact>();

    onClicked(): void {
        this.contactSelected.emit(this.contact());
    }
}
