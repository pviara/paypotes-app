import { CommonModule } from '@angular/common';
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
import { PhonePasteModifierDirective } from '@shared/directives/phone-paste-modifier.directive';
import { PickerFilter } from '@core/model/filters/picker-filter';

type FilterForm = {
    phoneNumber: FormControl<string>;
};

@Component({
    selector: 'filters',
    host: { collisionId: 'picker-filters' },
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    standalone: true,
    imports: [CommonModule, PhonePasteModifierDirective, ReactiveFormsModule],
})
export class FiltersComponent implements OnChanges, OnInit {
    private formBuilder = inject(FormBuilder);

    private previousPhoneNumber?: string;

    filtering = input.required<boolean>();

    form!: FormGroup<FilterForm>;

    @Output()
    updatedFilters = new EventEmitter<PickerFilter>();

    ngOnChanges(): void {
        if (!this.form) {
            return;
        }

        if (this.filtering()) {
            this.form.controls['phoneNumber'].disable();
        } else {
            this.form.controls['phoneNumber'].enable();
        }
    }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            phoneNumber: this.formBuilder.nonNullable.control(''),
        });
        this.handleFormChanges();
    }

    private handleFormChanges(): void {
        this.form.valueChanges
            .pipe(debounceTime(300))
            .subscribe(({ phoneNumber }) => {
                const someFiltersHaveChanged =
                    phoneNumber !== this.previousPhoneNumber;

                if (someFiltersHaveChanged) {
                    this.updatedFilters.emit(this.form.getRawValue());

                    this.previousPhoneNumber = phoneNumber;
                }
            });
    }
}
