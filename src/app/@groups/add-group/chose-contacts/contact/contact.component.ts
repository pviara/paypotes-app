import { Component, EventEmitter, input, Output } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { ContactV2 } from '@core/model/contact/v2/contact';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    contact = input.required<ContactV2>();
    last = input<boolean>(false);
    selected = input<boolean>(false);

    @Output()
    contactSelected = new EventEmitter<ContactV2>();

    onClicked(): void {
        this.contactSelected.emit(this.contact());
    }
}
