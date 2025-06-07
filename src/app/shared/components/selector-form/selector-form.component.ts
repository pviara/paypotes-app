import { Component, EventEmitter, input, Output } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { MemberV2 } from '@core/model/group/v2/member';
import { User } from '@core/model/user/user';

@Component({
    selector: 'selector-form',
    templateUrl: './selector-form.component.html',
    styleUrls: ['./selector-form.component.scss'],
})
export class SelectorFormComponent {
    persons = input<Contact[] | MemberV2[] | null>(null);

    @Output()
    personSelected = new EventEmitter<Contact | MemberV2>();

    isLastFrom(persons: (Contact | MemberV2)[], index: number): boolean {
        return index === persons.length - 1;
    }

    onPersonSelected(person: Contact | MemberV2): void {
        this.personSelected.emit(person);
    }
}
