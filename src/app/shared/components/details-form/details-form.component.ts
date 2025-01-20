import { AddExpenseFormToken } from '@core/services/form/form.provider';
import {
    Component,
    computed,
    EventEmitter,
    inject,
    input,
    OnInit,
    Output,
} from '@angular/core';
import {
    EXPENSE_NAME_SUGGESTIONS,
    GROUP_NAME_SUGGESTIONS,
} from '@shared/components/details-form/res/names-suggestions';

type DetailsFormContext = 'group' | 'expense';

@Component({
    selector: 'details-form',
    templateUrl: './details-form.component.html',
    styleUrls: ['./details-form.component.scss'],
})
export class DetailsFormComponent implements OnInit {
    context = input.required<DetailsFormContext>();
    currentContextIsExpense = computed(() => this.context() === 'expense');

    form = inject(AddExpenseFormToken);
    labels = { isCurrentPayer: 'isCurrentPayer', name: 'name' };

    placeholder = computed(() => this.getRandomName());

    @Output()
    buttonClicked = new EventEmitter<boolean>();

    ngOnInit(): void {
        this.initForm();
    }

    onButtonClicked(): void {
        this.buttonClicked.emit(this.getIsCurrentPayerFormValue());
    }

    onCheckboxChanged(active: boolean): void {
        this.form.getFieldFrom(this.labels.isCurrentPayer).setValue(active);
    }

    onInput(event: Event): void {
        const { value } = event.target as HTMLInputElement;
        this.form.getFieldFrom(this.labels.name).setValue(value);
    }

    private getRandomName(): string {
        const names = this.currentContextIsExpense()
            ? EXPENSE_NAME_SUGGESTIONS
            : GROUP_NAME_SUGGESTIONS;

        const randomIndex = this.getRandomIndexIn(names);
        return names[randomIndex];
    }

    private getRandomIndexIn(names: string[]): number {
        return Math.floor(Math.random() * names.length);
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

    private getIsCurrentPayerFormValue(): boolean | undefined {
        return this.form
            .getFieldFrom(this.labels.isCurrentPayer)
            .getValue() as boolean;
    }
}
