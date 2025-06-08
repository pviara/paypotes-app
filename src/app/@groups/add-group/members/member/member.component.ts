import { Component, EventEmitter, input, Output } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { User } from '@core/model/user/user';

@Component({
    selector: 'member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss'],
})
export class MemberComponent {
    data = input.required<User | Contact>();

    @Output()
    deleted = new EventEmitter<string>();

    delete(): void {
        this.deleted.emit(this.data().getId());
    }
}
