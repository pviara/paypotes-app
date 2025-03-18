import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { User } from '@core/model/user/user';

@Component({
    selector: 'selector-form',
    templateUrl: './selector-form.component.html',
    styleUrls: ['./selector-form.component.scss'],
})
export class SelectorFormComponent {
    persons = input.required<Contact[] | User[]>();

    @Output()
    personSelected = new EventEmitter<Contact | User>();

    isLastFrom(persons: (Contact | User)[], index: number): boolean {
        return index === persons.length - 1;
    }

    onPersonSelected(person: Contact | User): void {
        this.personSelected.emit(person);
    }
}
