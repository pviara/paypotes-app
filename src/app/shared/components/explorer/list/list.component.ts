import { BehaviorSubject } from 'rxjs';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { ListElements } from '@core/model/list-element/list-element';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: false,
})
export class ListComponent {
    private lastScrollTop = 0;

    $elements = input.required<BehaviorSubject<ListElements>>();

    @Output()
    elementHovered = new EventEmitter<string>();

    onElementHovered(elementId: string): void {
        return this.elementHovered.emit(elementId);
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
