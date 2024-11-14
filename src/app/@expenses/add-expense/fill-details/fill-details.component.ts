import { AddExpenseFormService } from '../add-expense.form-service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type FillDetailsForm = {
    name: FormControl<string>;
    isCurrentPayer: FormControl<boolean>;
};

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

const LETTERS_AND_SPACES_ONLY_PATTERN = /^[a-zA-ZÀ-ÿ\s]+$/;

@Component({
    selector: 'fill-details',
    templateUrl: './fill-details.component.html',
    styleUrls: ['./fill-details.component.scss'],
})
export class FillDetailsComponent {
    private formBuilder = inject(FormBuilder);
    private formService = inject(AddExpenseFormService);
    private router = inject(Router);

    form = this.formBuilder.group<FillDetailsForm>({
        name: this.formBuilder.nonNullable.control('', [
            Validators.required,
            Validators.minLength(1),
            Validators.pattern(LETTERS_AND_SPACES_ONLY_PATTERN),
        ]),
        isCurrentPayer: this.formBuilder.nonNullable.control(true),
    });

    placeholder = this.getRandomName();

    getRandomName(): string {
        const randomIndex = Math.floor(
            Math.random() * EXPENSE_NAME_SUGGESTIONS.length,
        );
        const name = EXPENSE_NAME_SUGGESTIONS[randomIndex];
        return `${name}...`;
    }

    onButtonClicked(): void {
        const { name, isCurrentPayer } = this.form.controls;
        if (name.valid) {
            this.formService.setName(name.value);
            this.formService.setIsCurrentPayer(isCurrentPayer.value);
            this.router.navigate(['expenses', 'add', 'person']);
        }
    }

    onCheckboxChanged(active: boolean): void {
        this.form.controls.isCurrentPayer.setValue(active);
    }
}
