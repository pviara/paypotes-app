import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AddGroupFormToken } from '@core/services/form/form.provider';

const GROUP_NAME_SUGGESTIONS = [
    'Soirée entre amis',
    'Dîner entre potes',
    'Fête d’anniversaire',
    'Cinéma et pop-corn',
    'Apéro convivial',
    'Soirée pizza',
    'Brunch entre amis',
    'Kebab festif',
    'Petit-déj ensemble',
    'Goûter gourmand',
    'BBQ en plein air',
    'Bowling fun',
    'Picnic au parc',
    'Soirée jeux',
    'Chill entre amis',
];

@Component({
    selector: 'fill-details',
    templateUrl: './fill-details.component.html',
    styleUrls: ['./fill-details.component.scss'],
})
export class FillDetailsComponent {
    private router = inject(Router);

    form = inject(AddGroupFormToken);
    label = 'name';

    placeholder = this.getRandomName();

    ngOnInit(): void {
        if (!this.form.exist(this.label)) {
            this.addFormFields();
        }
    }

    getRandomName(): string {
        const randomIndex = Math.floor(
            Math.random() * GROUP_NAME_SUGGESTIONS.length,
        );
        const name = GROUP_NAME_SUGGESTIONS[randomIndex];
        return `${name}...`;
    }

    onButtonClicked(): void {
        this.router.navigate(['groups', 'add', 'emoji']);
    }

    onInput(event: Event): void {
        const { value } = event.target as HTMLInputElement;
        this.form.getFieldFrom(this.label).setValue(value);
    }

    private addFormFields(): void {
        const LETTERS_AND_SPACES_ONLY_PATTERN = /^(?!\s+$)[a-zA-ZÀ-ÿ\s]+$/;
        this.form.addField({
            label: this.label,
            value: '',
            validators: [LETTERS_AND_SPACES_ONLY_PATTERN],
        });
    }
}
