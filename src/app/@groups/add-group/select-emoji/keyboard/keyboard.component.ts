import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { EmojiFinder } from '@shared/model/emoji-finder';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

type FilterForm = {
    search: FormControl<string>;
};

@Component({
    selector: 'emoji-keyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
    private formBuilder = inject(FormBuilder);

    private emojiFinder = new EmojiFinder();

    private lastScrollTop = 0;

    form!: FormGroup<FilterForm>;

    initialKeyboard = this.emojiFinder.getAllEmojis();
    filteredKeyboard = this.initialKeyboard;

    @Output()
    keyClicked = new EventEmitter<string>();

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            search: this.formBuilder.nonNullable.control(''),
        });

        this.form.valueChanges.subscribe(({ search }) => {
            this.filteredKeyboard = this.emojiFinder.filterFor(search || '');
        });
    }

    onKeyClicked(key: string): void {
        this.keyClicked.emit(key);
    }

    onScroll(event: Event): void {
        const element = event.target as HTMLElement;
        element.classList.remove('scroll-top', 'scroll-bottom');

        if (element.scrollTop >= this.lastScrollTop) {
            const className = 'scroll-top';
            element.classList.add(className);
            this.removeClassAfterTimeoutFor(element, className);
        } else {
            const className = 'scroll-bottom';
            element.classList.add(className);
            this.removeClassAfterTimeoutFor(element, className);
        }

        this.lastScrollTop = element.scrollTop;
    }

    private removeClassAfterTimeoutFor(
        element: HTMLElement,
        className: string,
    ): void {
        setTimeout(() => element.classList.remove(className), 500);
    }
}
