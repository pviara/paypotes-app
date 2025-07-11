import { BehaviorSubject, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import {
    Component,
    EventEmitter,
    inject,
    input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'manual-name-input',
    templateUrl: './manual-name-input.component.html',
    styleUrls: ['./manual-name-input.component.scss'],
    standalone: false,
})
export class ManualNameInputComponent implements OnInit {
    private formBuilder = inject(FormBuilder);

    error = input<string>();

    form = this.formBuilder.group({
        name: this.formBuilder.nonNullable.control('', [
            Validators.required,
            Validators.minLength(2),
        ]),
    });

    $isLoading = input<BehaviorSubject<boolean> | null>(null);

    @Output()
    searching = new EventEmitter<string>();

    ngOnInit(): void {
        this.form.valueChanges
            .pipe(
                debounceTime(700),
                distinctUntilChanged(
                    (previous, current) => previous.name === current.name,
                ),
                tap(({ name }) => {
                    if (!this.$isLoading()?.getValue() && name) {
                        this.searching.emit(name);
                    }
                }),
            )
            .subscribe();

        this.$isLoading()
            ?.pipe(
                tap((isLoading) => {
                    if (isLoading) this.form.controls.name.disable();
                    else this.form.controls.name.enable();
                }),
            )
            .subscribe();
    }
}
