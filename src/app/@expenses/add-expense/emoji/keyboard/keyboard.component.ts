import { Component, EventEmitter, input, Output } from '@angular/core';
import { EMOJIS } from '@core/model/emojis';

@Component({
    selector: 'emoji-keyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent {
    private lastScrollTop = 0;

    invalid = input<boolean>(true);

    keyboard = Object.keys(EMOJIS);

    @Output()
    keyClicked = new EventEmitter<string>();

    onKeyClicked(key: string): void {
        console.log('clicked', key);
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
