import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, shareReplay, switchMap, tap } from 'rxjs';
import { Component, inject } from '@angular/core';
import {
    ContactServiceProvider,
    ContactServiceToken,
} from '@core/services/contact/contact.api-service.provider';
import {
    ExpenseServiceProvider,
    ExpenseServiceToken,
} from '@core/services/expense/expense.service.provider';
import { FiltersEvent } from '@core/model/filters/filters-event';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { ListElements } from '@core/model/list-element/list-element';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    providers: [
        ExpenseServiceProvider,
        ContactServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
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

    onExpensesRequested({ pageIndex, filters }: FiltersEvent): void {
        this.expenseService
            .getContactExpenses(this.contactId, pageIndex, filters)
            .subscribe((expenses) => {
                this.$expenses.next(expenses);
            });
    }
}
