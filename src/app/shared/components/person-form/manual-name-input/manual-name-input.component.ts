import { BehaviorSubject, debounceTime, tap } from 'rxjs';
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
})
export class ManualNameInputComponent implements OnInit {
    private formBuilder = inject(FormBuilder);

    form = this.formBuilder.group({
        name: this.formBuilder.control('', [
            Validators.required,
            Validators.minLength(2),
        ]),
    });

    $isLoading = input<BehaviorSubject<boolean> | null>(null);

    error = input<string>();

    @Output()
    searching = new EventEmitter<string>();

    ngOnInit(): void {
        this.form.valueChanges
            .pipe(debounceTime(1000))
            .subscribe(({ name }) => {
                if (!this.$isLoading()?.getValue() && name) {
                    this.searching.emit(name);
                }
            });

        this.$isLoading()?.subscribe((isLoading) => {
            if (isLoading) this.form.controls.name.disable();
            else this.form.controls.name.enable();
        });
    }
}
