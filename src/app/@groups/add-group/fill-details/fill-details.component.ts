import { AddGroupFormService } from '@groups/add-group/add-group.form-service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type FillDetailsForm = {
    name: FormControl<string>;
    isCurrentPayer: FormControl<boolean>;
};

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

const LETTERS_AND_SPACES_ONLY_PATTERN = /^(?!\s+$)[a-zA-ZÀ-ÿ\s]+$/;

@Component({
    selector: 'fill-details',
    templateUrl: './fill-details.component.html',
    styleUrls: ['./fill-details.component.scss'],
})
export class FillDetailsComponent {
    private formBuilder = inject(FormBuilder);
    private formService = inject(AddGroupFormService);
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
            Math.random() * GROUP_NAME_SUGGESTIONS.length,
        );
        const name = GROUP_NAME_SUGGESTIONS[randomIndex];
        return `${name}...`;
    }

    onButtonClicked(): void {
        const { name } = this.form.controls;
        if (name.valid) {
            this.formService.setName(name.value);
            this.router.navigate(['groups', 'add', 'emoji']);
        }
    }

    onCheckboxChanged(active: boolean): void {
        this.form.controls.isCurrentPayer.setValue(active);
    }
}
