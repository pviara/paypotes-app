import { BehaviorSubject } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PickerFilterEvent } from '@core/model/filters/picker-filter-event';
import {
    ListElement,
    ListElements,
} from '@core/model/list-element/list-element';

type AddContactForm = {
    telephone: FormControl<string>;
};

@Component({
    selector: 'add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
    private formBuilder = inject(FormBuilder);

    $users = new BehaviorSubject<ListElements>([]);

    addContactForm!: FormGroup<AddContactForm>;

    ngOnInit() {
        this.addContactForm = this.formBuilder.nonNullable.group({
            telephone: this.formBuilder.nonNullable.control(''),
        });
    }

    onUsersRequested({ phoneNumber }: PickerFilterEvent): void {
        console.log('searching for phone number', phoneNumber);
    }
}
