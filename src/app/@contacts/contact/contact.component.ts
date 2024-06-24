import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, shareReplay, switchMap, tap } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { Filters } from '@core/model/expense/filters';
import { ListElements } from '@core/model/list-element/list-element';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    private expenseService = inject(ExpenseServiceToken);
    private contactService = inject(ContactServiceToken);
    private route = inject(ActivatedRoute);

    private contactId = '';

    $contact = this.route.params.pipe(
        tap((params) => (this.contactId = params['contactId'])),
        switchMap(() => this.contactService.getContact(this.contactId)),
        shareReplay(1),
    );

    $expenses = new BehaviorSubject<ListElements>([]);

    onExpensesRequested(event: {
        pageIndex?: number;
        filters?: Filters;
    }): void {
        this.expenseService
            .getContactExpenses(this.contactId, event.pageIndex, event.filters)
            .subscribe((expenses) => {
                this.$expenses.next(expenses);
            });
    }
}
