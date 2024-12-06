import {
    AddExpenseDTO,
    ExpenseService,
} from '@core/services/expense/expense.service';
import { Contact } from '@core/model/contact/contact';
import { Expense, Expenses } from '@core/model/expense/expense';
import { Filters } from '@core/model/filters/filters';
import { generateRandomDate } from '@shared/utils/get-random-date';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { getRandomEmoji } from '@shared/utils/get-random-emoji';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map } from 'rxjs';
import { QueryService } from '@core/services/query/query.service';

export class ExpenseAPIService implements ExpenseService {
    private readonly endpoint = '/api/expense';

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    addExpense(payload: AddExpenseDTO): Observable<void> {
        return this.httpClientService.post(this.endpoint, payload);
    }

    getContactExpenses(
        contactId: string,
        pageIndex = 0,
        filters?: Filters,
    ): Observable<Expenses> {
        const query = this.queryService.buildQueryFrom({
            contactId,
            pageIndex,
            filters,
        });

        return this.httpClientService
            .get<Expenses>(`${this.endpoint}${query}`)
            .pipe(map(this.getRandomExpenses(filters?.type)));
    }

    getExpense(id: string): Observable<Expense> {
        return this.httpClientService
            .get<Expense>(`${this.endpoint}/${id}`)
            .pipe(map(() => this.getRandomExpense(999)));
    }

    getExpenses(pageIndex = 0, filters?: Filters): Observable<Expenses> {
        const query = this.queryService.buildQueryFrom({ pageIndex, filters });

        return this.httpClientService
            .get<Expenses>(`${this.endpoint}${query}`)
            .pipe(map(this.getRandomExpenses(filters?.type)));
    }

    getGroupExpenses(
        groupId: string,
        pageIndex = 0,
        filters?: Filters,
    ): Observable<Expenses> {
        const query = this.queryService.buildQueryFrom({
            groupId,
            pageIndex,
            filters,
        });

        return this.httpClientService
            .get<Expenses>(`${this.endpoint}${query}`)
            .pipe(map(this.getRandomExpenses(filters?.type)));
    }

    payback(id: string): Observable<void> {
        return this.httpClientService.patch(
            `${this.endpoint}/payback?expenseId=${id}`,
        );
    }

    private getRandomExpenses(type: Filters['type']): () => Expenses {
        return () =>
            Array.from({ length: 20 })
                .map((_, index) => this.getRandomExpense(index))
                .map((expense) => {
                    if (!type) {
                        return expense;
                    }

                    return new Expense({
                        id: expense.getId(),
                        label: expense.getLabel(),
                        date: expense.getDate(),
                        emoji: expense.getEmoji(),
                        balance:
                            type === 'debt'
                                ? -Math.abs(expense.getBalance() * 100)
                                : Math.abs(expense.getBalance() * 100),
                        origin: expense.getOrigin(),
                    });
                });
    }

    private getRandomExpense(index: number): Expense {
        return new Expense({
            id: generateRandomString(),
            label: `Dépense #${index}`,
            date: generateRandomDate(),
            emoji: getRandomEmoji(),
            origin: new Contact({
                id: generateRandomString(),
                firstname: 'Claire',
                lastname: 'Laroche',
                avatarURL: 'claire.png',
                balance: 9080,
            }),
            balance: Math.ceil(Math.random() * (9999 - -9999 + 1) + -9999),
        });
    }
}
