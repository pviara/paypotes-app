import { Component, EventEmitter, input, Output } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { MemberV2 } from '@core/model/group/v2/member';
import { User } from '@core/model/user/user';

@Component({
    selector: 'person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
    person = input.required<Contact | MemberV2>();
    last = input<boolean>(false);

    @Output()
    personSelected = new EventEmitter<Contact | MemberV2>();

    onClicked(): void {
        this.personSelected.emit(this.person());
    }
}
