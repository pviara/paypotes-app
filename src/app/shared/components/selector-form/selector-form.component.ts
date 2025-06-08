import { Component, EventEmitter, input, Output } from '@angular/core';
import { Contacts, Contact } from '@core/model/contact/contact';
import { Member } from '@core/model/group/member';

@Component({
    selector: 'selector-form',
    templateUrl: './selector-form.component.html',
    styleUrls: ['./selector-form.component.scss'],
})
export class SelectorFormComponent {
    persons = input<Contacts | Member[] | null>(null);

    @Output()
    personSelected = new EventEmitter<Contact | Member>();

    isLastFrom(persons: (Contact | Member)[], index: number): boolean {
        return index === persons.length - 1;
    }

    onPersonSelected(person: Contact | Member): void {
        this.personSelected.emit(person);
    }
}
