import { Component, EventEmitter, input, Output } from '@angular/core';
import { User } from '@core/model/user/user';

@Component({
    selector: 'member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss'],
})
export class MemberComponent {
    member = input.required<User>();
    last = input<boolean>(false);

    @Output()
    memberSelected = new EventEmitter<User>();

    onClicked(): void {
        this.memberSelected.emit(this.member());
    }
}
