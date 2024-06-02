import {
    AfterViewInit,
    Component,
    EventEmitter,
    Output,
    PLATFORM_ID,
    inject,
    input,
} from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Expense } from '@core/model/expense/expense';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { Group } from '@core/model/group/group';
import { ListElement } from '@core/model/list-element/list-element';
import { Router } from '@angular/router';

@Component({
    selector: 'list-element',
    templateUrl: './list-element.component.html',
    styleUrls: ['./list-element.component.scss'],
})
export class ListElementComponent implements AfterViewInit {
    private document = inject(DOCUMENT);
    private platformId = inject(PLATFORM_ID);
    private router = inject(Router);

    private observer!: IntersectionObserver;

    element = input.required<ListElement>();

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

    redirectToDetail(): void {
        const type = {
            isContact: this.element() instanceof Contact,
            isExpense: this.element() instanceof Expense,
            isGroup: this.element() instanceof Group,
        };

        if (type.isContact) {
            console.log('redirect to contact detail');
        } else if (type.isExpense) {
            console.log('redirect to expense detail');
            this.router.navigate([`/expenses/${this.element()?.getId()}`], {
                state: {
                    expense: this.element(),
                },
            });
        } else if (type.isGroup) {
            console.log('redirect to group detail');
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
