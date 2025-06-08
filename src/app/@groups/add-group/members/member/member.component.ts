import { Component, EventEmitter, input, Output } from '@angular/core';
import { ContactV2 } from '@core/model/contact/v2/contact';
import { User } from '@core/model/user/user';

@Component({
    selector: 'member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss'],
})
export class MemberComponent {
    data = input.required<User | ContactV2>();

    @Output()
    deleted = new EventEmitter<string>();

    delete(): void {
        this.deleted.emit(this.data().getId());
    }
}
