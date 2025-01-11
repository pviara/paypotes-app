import { ActivatedRoute, Router } from '@angular/router';
import { AddGroupExpenseFormServiceToken } from '@core/services/form/form.service.provider';
import { Component, inject, OnInit } from '@angular/core';

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
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    form = inject(AddGroupExpenseFormServiceToken);
    labels = { isCurrentPayer: 'isCurrentPayer', name: 'name' };

    placeholder = this.getRandomName();

    ngOnInit(): void {
        if (!this.form.exist(this.labels.isCurrentPayer, this.labels.name)) {
            this.addFormFields();
        }
    }

    getCurrentGroupRoute(): string {
        return `/groups/${this.getCurrentGroupId()}`;
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

    private getCurrentGroupId(): string {
        return this.route.snapshot.params['groupId'];
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
