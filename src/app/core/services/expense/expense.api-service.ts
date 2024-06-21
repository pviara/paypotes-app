import { Contact } from '@core/model/contact/contact';
import { Emoji } from '@core/model/emoji';
import { Expense, Expenses } from '@core/model/expense/expense';
import { ExpenseService } from '@core/services/expense/expense.service';
import { Filters } from '@core/model/expense/filters';
import { generateRandomDate } from '@shared/utils/get-random-date';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { getRandomEmoji } from '@shared/utils/get-random-emoji';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map } from 'rxjs';

export class ExpenseAPIService implements ExpenseService {
    private readonly endpoint = 'http://localhost:3000/api/expense';

    constructor(private httpClientService: HttpClientService) {}

    getExpense(id: string): Observable<Expense> {
        return this.httpClientService
            .get<Expense>(`${this.endpoint}/${id}`)
            .pipe(map(() => this.getRandomExpense(999)));
    }

    getExpenses(pageIndex = 0, filters?: Filters): Observable<Expenses> {
        const url = this.buildURLWith({ pageIndex, filters });

        return this.httpClientService
            .get<Expenses>(url)
            .pipe(map(this.getRandomExpenses()));
    }

    getGroupExpenses(
        groupId: string,
        pageIndex = 0,
        filters?: Filters,
    ): Observable<Expenses> {
        const url = this.buildURLWith({ groupId, pageIndex, filters });

        return this.httpClientService
            .get<Expenses>(url)
            .pipe(map(this.getRandomExpenses()));
    }

    payback(id: string): Observable<void> {
        return this.httpClientService.patch(`${this.endpoint}/payback/${id}`);
    }

    private buildURLWith(query: Record<string, any>): string {
        const isQueryEmpty = Object.values(query).every((value) => !value);
        if (isQueryEmpty) {
            return this.endpoint;
        }

        const url = `${this.endpoint}?`;
        return this.appendElementsFrom(query, url);
    }

    private appendElementsFrom(query: Record<string, any>, url = ''): string {
        for (const key of Object.keys(query)) {
            const value = query[key];

            if (value) {
                if (typeof value === 'object') {
                    url += this.appendElementsFrom(value);
                    continue;
                }

                const prefix = url.endsWith('?') ? '' : '&';
                url += `${prefix}${key}=${value}`;
            }
        }
        return url;
    }

    private getRandomExpenses(): () => Expenses {
        return () =>
            Array.from({ length: 20 }).map((_, index) =>
                this.getRandomExpense(index),
            );
    }

    private getRandomExpense(index: number): Expense {
        return new Expense({
            id: generateRandomString(),
            label: `Dépense #${index}`,
            date: generateRandomDate(),
            emoji: getRandomEmoji() as Emoji,
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
