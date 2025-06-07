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
import { ListElement } from '@core/model/list-element/list-element';
import { Router } from '@angular/router';
import { GroupWithBalanceV2 } from '@core/model/group/v2/group-with-balance';

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
        const element = this.element();
        if (!element) return;

        const type = {
            isContact: element instanceof Contact,
            isExpense: element instanceof Expense,
            isGroup: element instanceof GroupWithBalanceV2,
        };

        if (type.isContact) {
            this.router.navigate([`/contacts/${element.getId()}`]);
        } else if (type.isExpense) {
            this.router.navigate([`/expenses/pair/${element.getId()}`]);
        } else if (type.isGroup) {
            this.router.navigate([`/groups/${element.getId()}`]);
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
