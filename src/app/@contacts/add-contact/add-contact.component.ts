import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

    addContactForm!: FormGroup<AddContactForm>;

    ngOnInit() {
        this.addContactForm = this.formBuilder.nonNullable.group({
            telephone: this.formBuilder.nonNullable.control(''),
        });
    }
}
