import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormServiceToken } from '@core/services/form/form.service.provider';
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

@Component({
    selector: 'fill-details',
    templateUrl: './fill-details.component.html',
    styleUrls: ['./fill-details.component.scss'],
})
export class FillDetailsComponent implements OnInit {
    private router = inject(Router);

    form = inject(FormServiceToken);
    labels = { isCurrentPayer: 'isCurrentPayer', name: 'name' };

    placeholder = this.getRandomName();

    ngOnInit(): void {
        if (!this.form.exist(this.labels.isCurrentPayer, this.labels.name)) {
            this.addFormFields();
        }
    }

    getRandomName(): string {
        const randomIndex = Math.floor(
            Math.random() * EXPENSE_NAME_SUGGESTIONS.length,
        );
        const name = EXPENSE_NAME_SUGGESTIONS[randomIndex];
        return `${name}...`;
    }

    onButtonClicked(): void {
        this.router.navigate(['expenses', 'add', 'person']);
    }

    onCheckboxChanged(active: boolean): void {
        this.form.getFieldFrom(this.labels.isCurrentPayer).setValue(active);
    }

    onInput(event: Event): void {
        const { value } = event.target as HTMLInputElement;
        this.form.getFieldFrom(this.labels.name).setValue(value);
    }

    private addFormFields(): void {
        this.form.addField({ label: this.labels.isCurrentPayer, value: true });

        const LETTERS_AND_SPACES_ONLY_PATTERN = /^(?!\s+$)[a-zA-ZÀ-ÿ\s]+$/;
        this.form.addField({
            label: this.labels.name,
            value: '',
            regexps: [LETTERS_AND_SPACES_ONLY_PATTERN],
        });

        this.form.focus(this.labels.isCurrentPayer, this.labels.name);
    }
}
