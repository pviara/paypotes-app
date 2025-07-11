import { Component, EventEmitter, input, Output } from '@angular/core';
import { Person } from '@core/model/person';

@Component({
    selector: 'person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss'],
    standalone: false,
})
export class PersonComponent {
    person = input.required<Person>();
    last = input<boolean>(false);

    @Output()
    personSelected = new EventEmitter<Person>();

    onClicked(): void {
        this.personSelected.emit(this.person());
    }
}
