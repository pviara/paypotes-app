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
import { Expense } from '@core/model/expense/expense';
import { generateRandomString } from '@shared/utils/generate-random-string';

@Component({
    selector: 'expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements AfterViewInit {
    private document = inject(DOCUMENT);
    private platformId = inject(PLATFORM_ID);

    private observer!: IntersectionObserver;

    expense = input<Expense | null>();

    isLoading = input.required<boolean>();

    randomId = generateRandomString();

    @Output()
    expenseHovered = new EventEmitter<string>();

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
            (entries, observer) => {
                entries.forEach((entry) =>
                    this.revealIntersecting(entry, observer),
                );
            },
            {
                threshold: 0.2,
            },
        );
    }

    private revealIntersecting(
        entry: IntersectionObserverEntry,
        observer: IntersectionObserver,
    ): void {
        if (entry.isIntersecting) {
            this.emitExpenseHovered();
            observer.unobserve(entry.target);
        }
    }

    private emitExpenseHovered(): void {
        const expense = this.expense();
        if (expense) {
            this.expenseHovered.emit(expense.getId());
        }
    }

    private observe(targets: NodeListOf<Element>): void {
        targets.forEach((el) => this.observer.observe(el));
    }
}
