import {
    AfterViewInit,
    Component,
    EventEmitter,
    Output,
    PLATFORM_ID,
    inject,
    input,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { ListElement } from '@core/model/list-element/list-element';

@Component({
    selector: 'list-element',
    templateUrl: './list-element.component.html',
    styleUrls: ['./list-element.component.scss'],
})
export class ListElementComponent implements AfterViewInit {
    private document = inject(DOCUMENT);
    private platformId = inject(PLATFORM_ID);

    private observer!: IntersectionObserver;

    element = input.required<ListElement | null>();

    randomId = generateRandomString();

    @Output()
    hovered = new EventEmitter<string>();

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.observer) {
                this.createViewportObserver();
            }

            const targets = this.document.querySelectorAll(`#${this.randomId}`);
            this.observe(targets);
        }
    }

    private createViewportObserver(): void {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => this.revealIntersecting(entry));
            },
            {
                threshold: 0.2,
            },
        );
    }

    private revealIntersecting(entry: IntersectionObserverEntry): void {
        if (entry.isIntersecting) {
            this.emitExpenseHovered();
        }
    }

    private emitExpenseHovered(): void {
        const element = this.element();
        if (element) {
            this.hovered.emit(element.getId());
        }
    }

    private observe(targets: NodeListOf<Element>): void {
        targets.forEach((el) => this.observer.observe(el));
    }
}
