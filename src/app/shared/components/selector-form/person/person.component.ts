import { Component, EventEmitter, input, Output } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { ContactV2 } from '@core/model/contact/v2/contact';
import { Member } from '@core/model/group/member';
import { User } from '@core/model/user/user';

@Component({
    selector: 'person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
    person = input.required<ContactV2 | Member>();
    last = input<boolean>(false);

    @Output()
    personSelected = new EventEmitter<ContactV2 | Member>();

    onClicked(): void {
        this.personSelected.emit(this.person());
    }
}
