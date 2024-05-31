import { BehaviorSubject } from 'rxjs';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { DisplayedContacts } from '@core/model/contact/displayed-contacts';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent {
    private lastScrollTop = 0;

    $contacts = input.required<BehaviorSubject<DisplayedContacts>>();

    @Output()
    contactHovered = new EventEmitter<string>();

    onContactHovered(contactId: string): void {
        return this.contactHovered.emit(contactId);
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
