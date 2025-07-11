import { Component, EventEmitter, input, Output } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { Member } from '@core/model/group/member';

@Component({
    selector: 'member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss'],
    standalone: false,
})
export class MemberComponent {
    data = input.required<Contact | Member>();

    @Output()
    deleted = new EventEmitter<string>();

    delete(): void {
        this.deleted.emit(this.data().getId());
    }
}
