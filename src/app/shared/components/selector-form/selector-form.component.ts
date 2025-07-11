import { Component, EventEmitter, input, Output } from '@angular/core';
import { Person, Persons } from '@core/model/person';

@Component({
    selector: 'selector-form',
    templateUrl: './selector-form.component.html',
    styleUrls: ['./selector-form.component.scss'],
    standalone: false,
})
export class SelectorFormComponent {
    persons = input<Persons | null>(null);

    @Output()
    personSelected = new EventEmitter<Person>();

    isLastFrom(persons: Persons, index: number): boolean {
        return index === persons.length - 1;
    }

    onPersonSelected(person: Person): void {
        this.personSelected.emit(person);
    }
}
