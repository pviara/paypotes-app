import { AddExpenseFormToken } from '@core/services/form/form.provider';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';

const EXPENSE_NAME_SUGGESTIONS = [
    'Dîner entre potes',
    'Courses du mois',
    'Resto du midi',
    'Soirée ciné',
    'Apéro du vendredi',
    'Pizza à emporter',
    'Courses pour la soirée',
    'Brunch du dimanche',
    'Kebab nocturne',
    'Petit-déj en ville',
    'Goûter au café',
    'BBQ chez Marc',
    'Sortie bowling',
    "Courses pour l'appart",
    'Picnic au parc',
];

@Component({
    selector: 'details-form',
    templateUrl: './details-form.component.html',
    styleUrls: ['./details-form.component.scss'],
})
export class DetailsFormComponent implements OnInit {
    form = inject(AddExpenseFormToken);
    labels = { isCurrentPayer: 'isCurrentPayer', name: 'name' };

    placeholder = this.getRandomName();

    @Output()
    buttonClicked = new EventEmitter<never>();

    ngOnInit(): void {
        this.initForm();
    }

    getRandomName(): string {
        const randomIndex = Math.floor(
            Math.random() * EXPENSE_NAME_SUGGESTIONS.length,
        );
        const name = EXPENSE_NAME_SUGGESTIONS[randomIndex];
        return `${name}...`;
    }

    onButtonClicked(): void {
        this.buttonClicked.emit();
    }

    onCheckboxChanged(active: boolean): void {
        this.form.getFieldFrom(this.labels.isCurrentPayer).setValue(active);
    }

    onInput(event: Event): void {
        const { value } = event.target as HTMLInputElement;
        this.form.getFieldFrom(this.labels.name).setValue(value);
    }

    private initForm(): void {
        if (!this.form.exist(this.labels.isCurrentPayer, this.labels.name)) {
            this.addFormFields();
        }
    }

    private addFormFields(): void {
        this.form.addField({ label: this.labels.isCurrentPayer, value: true });

        const LETTERS_AND_SPACES_ONLY_PATTERN = /^(?!\s+$)[a-zA-ZÀ-ÿ\s]+$/;
        this.form.addField({
            label: this.labels.name,
            value: '',
            validators: [LETTERS_AND_SPACES_ONLY_PATTERN],
        });
    }
}
