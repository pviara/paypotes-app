import { ActivatedRoute, Router } from '@angular/router';
import {
    BehaviorSubject,
    catchError,
    filter,
    map,
    shareReplay,
    switchMap,
    tap,
} from 'rxjs';
import { Component, inject } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { ContactServiceToken } from '@core/services/contact/contact.api-service.provider';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { FiltersEvent } from '@core/model/filters/filters-event';
import { ListElements } from '@core/model/list-element/list-element';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: false,
})
export class ContactComponent {
    private expenseService = inject(ExpenseServiceToken);
    private contactService = inject(ContactServiceToken);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private contactId = '';

    $contact = this.route.params.pipe(
        tap((params) => (this.contactId = params['contactId'])),
        switchMap(() => this.contactService.getContact(this.contactId)),
        catchError(() => this.router.navigate(['contacts'])),
        filter((contact) => contact instanceof Contact),
        shareReplay(1),
    );

    $contactFullname = this.$contact.pipe(
        map((contact) => contact.getFullName()),
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
