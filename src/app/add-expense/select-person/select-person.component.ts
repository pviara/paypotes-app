import { Component } from '@angular/core';
import { User } from '@core/model/user/user';

@Component({
    selector: 'select-person',
    templateUrl: './select-person.component.html',
    styleUrls: ['./select-person.component.scss'],
})
export class SelectPersonComponent {
    searching = false;

    onSearching(searching: any): void {
        this.searching = searching;
    }

    onUserFound(user: User): void {
        console.log(user);
    }
}
