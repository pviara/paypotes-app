import {
    Component,
    computed,
    EventEmitter,
    inject,
    input,
    OnInit,
    Output,
} from '@angular/core';
import { FormService } from '@core/services/form/form.service';
import { getValidator, ValidatorKey } from '@core/model/form/validator';
import { Person, Persons } from '@core/model/person';

@Component({
    selector: 'chose-persons-form',
    templateUrl: './chose-persons-form.component.html',
    styleUrls: ['./chose-persons-form.component.scss'],
})
export class ChosePersonsFormComponent implements OnInit {
    private formService = inject(FormService);

    buttonDisabled = computed(() => this.disabled() ?? false);
    disabled = input<boolean | null>(false);
    noPerson = computed(() => (this.persons()?.length || 0) === 0);
    persons = input<Persons | null>(null);
    text = input.required<string>();

    form = this.formService.injectCurrentForm();
    label = 'persons';

    @Output()
    buttonClicked = new EventEmitter<Persons>();

    ngOnInit(): void {
        this.initForm();
    }

    isLastFrom(persons: Persons, index: number): boolean {
        return index === persons.length - 1;
    }

    isPersonSelected(person: Person): boolean {
        const persons = this.getSelectedPersons();
        return persons.some((selected) => selected.getId() === person.getId());
    }

    onButtonClicked(): void {
        const persons = this.getSelectedPersons();
        this.buttonClicked.emit(persons);
    }

    onPersonSelected(person: Person): void {
        const persons = this.form.getFieldFrom(this.label).getValue<Persons>();

        if (this.isPersonSelected(person)) {
            this.unselect(person, persons);
        } else {
            persons.push(person);
        }

        this.form.getFieldFrom(this.label).setValue(persons);
    }

    private unselect(person: Person, persons: Persons): void {
        const index = persons.findIndex(
            (selected) => selected.getId() === person.getId(),
        );
        persons.splice(index, 1);
    }

    private initForm(): void {
        if (!this.form.exist(this.label)) {
            this.form.addField({
                label: this.label,
                value: [],
                validators: [getValidator(ValidatorKey.MinLengthOne)],
            });
        }
    }

    private getSelectedPersons(): Persons {
        return this.form.getFieldFrom(this.label).getValue<Persons>();
    }
}
