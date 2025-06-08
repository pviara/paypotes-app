import { Component, EventEmitter, input, Output } from '@angular/core';
import { ContactV2 } from '@core/model/contact/contact';

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
