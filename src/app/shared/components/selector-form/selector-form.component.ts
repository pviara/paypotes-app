import { Component, EventEmitter, input, Output } from '@angular/core';
import { ContactsV2, ContactV2 } from '@core/model/contact/contact';
import { Member } from '@core/model/group/member';

@Component({
    selector: 'selector-form',
    templateUrl: './selector-form.component.html',
    styleUrls: ['./selector-form.component.scss'],
})
export class SelectorFormComponent {
    persons = input<ContactsV2 | Member[] | null>(null);

    @Output()
    personSelected = new EventEmitter<ContactV2 | Member>();

    isLastFrom(persons: (ContactV2 | Member)[], index: number): boolean {
        return index === persons.length - 1;
    }

    onPersonSelected(person: ContactV2 | Member): void {
        this.personSelected.emit(person);
    }
}
