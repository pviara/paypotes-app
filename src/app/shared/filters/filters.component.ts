import {
    Component,
    EventEmitter,
    OnChanges,
    OnInit,
    Output,
    inject,
    input,
} from '@angular/core';
import { debounceTime } from 'rxjs';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';
import { Filters } from '@core/model/expense/filters';
import { CommonModule } from '@angular/common';

type ExpenseType = 'all' | 'claim' | 'debt';

type ExpenseTypeOption = {
    label: string;
    type: ExpenseType;
};

type FiltersForm = {
    search: FormControl<string>;
    type: FormControl<ExpenseType>;
};

@Component({
    selector: 'filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
})
export class FiltersComponent implements OnChanges, OnInit {
    private formBuilder = inject(FormBuilder);

    private previousSearch?: string;
    private previousType?: string;

    filtering = input.required<boolean>();

    form!: FormGroup<FiltersForm>;

    options: Array<ExpenseTypeOption> = [
        { label: 'Tous', type: 'all' },
        { label: 'Créances', type: 'claim' },
        { label: 'Dettes', type: 'debt' },
    ];

    @Output()
    updatedFilters = new EventEmitter<Filters>();

    ngOnChanges(): void {
        if (!this.form) {
            return;
        }

        if (this.filtering()) {
            this.form.controls['search'].disable();
            this.form.controls['type'].disable();
        } else {
            this.form.controls['search'].enable();
            this.form.controls['type'].enable();
        }
    }

    ngOnInit(): void {
        this.initForm();
    }

    onSelect(option: ExpenseTypeOption): void {
        if (this.filtering()) {
            return;
        }

        this.form.controls['type'].setValue(option.type);
    }

    selected(option: ExpenseTypeOption): boolean {
        return this.form.getRawValue()['type'] === option.type;
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            search: this.formBuilder.nonNullable.control(''),
            type: this.formBuilder.nonNullable.control<ExpenseType>('all'),
        });
        this.handleFormChanges();
    }

    private handleFormChanges(): void {
        this.form.valueChanges
            .pipe(debounceTime(300))
            .subscribe(({ search, type }) => {
                const someFiltersHaveChanged =
                    search !== this.previousSearch ||
                    type !== this.previousType;

                if (someFiltersHaveChanged) {
                    this.updatedFilters.emit(this.form.getRawValue());

                    this.previousSearch = search;
                    this.previousType = type;
                }
            });
    }
}
