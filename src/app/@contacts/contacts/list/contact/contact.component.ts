import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    Component,
    EventEmitter,
    Output,
    PLATFORM_ID,
    inject,
    input,
} from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { generateRandomString } from '@shared/utils/generate-random-string';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    private document = inject(DOCUMENT);
    private platformId = inject(PLATFORM_ID);

    private observer!: IntersectionObserver;

    contact = input<Contact | null>();

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
            this.emitContactHovered();
        }
    }

    private emitContactHovered(): void {
        const contact = this.contact();
        if (contact) {
            this.hovered.emit(contact.getId());
        }
    }

    private observe(targets: NodeListOf<Element>): void {
        targets.forEach((el) => this.observer.observe(el));
    }
}
