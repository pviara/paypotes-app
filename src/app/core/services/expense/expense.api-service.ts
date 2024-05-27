import { Emoji } from '@core/model/emoji';
import { Expense, Expenses } from '@core/model/expense/expense';
import { ExpenseService } from '@core/services/expense/expense.service';
import { Filters } from '@core/model/expense/filters';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { getRandomEmoji } from '@shared/utils/get-random-emoji';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map, of, tap } from 'rxjs';

export class ExpenseAPIService implements ExpenseService {
    private cachedExpenses: Expenses = [];

    private readonly endpoint = 'api_url_to_expense';

    constructor(private httpClientService: HttpClientService) {}

    getExpenses(pageIndex = 0, filters?: Filters): Observable<Expenses> {
        if (filters?.search) {
            const matches = this.getFromCacheFor(filters.search);
            if (matches.length > 0) {
                return of(matches);
            }
        }

        return this.getExpensesFromClientUsing(pageIndex, filters);
    }

    private getFromCacheFor(search: string): Expenses {
        return this.cachedExpenses.filter((expense) =>
            expense.getLabel().toLowerCase().includes(search.toLowerCase()),
        );
    }

    private getExpensesFromClientUsing(
        pageIndex: number,
        filters?: Filters,
    ): Observable<Expenses> {
        const url = this.buildURLWith(pageIndex, filters);

        return this.httpClientService.get<Expenses>(url).pipe(
            tap((expenses) => {
                this.cachedExpenses = this.cachedExpenses.concat(expenses);
            }),
            map(this.getRandomExpenses()),
        );
    }

    private buildURLWith(pageIndex: number, filters?: Filters): string {
        const query: Record<string, string | undefined> = {
            pageIndex: pageIndex.toString(),
            search: filters?.search,
            type: filters?.type,
        };

        const isQueryEmpty = Object.values(query).every((value) => !value);
        if (isQueryEmpty) {
            return this.endpoint;
        }

        let url = `${this.endpoint}?`;

        Object.keys(query).forEach((key) => {
            const value = query[key];

            if (value) {
                const prefix = url.endsWith('?') ? '' : '&';
                url += `${prefix}${key}=${value}`;
            }
        });

        return url;
    }

    private getRandomExpenses(): () => Expenses {
        return () =>
            Array.from({ length: 20 }).map((_, index) => {
                return new Expense({
                    id: generateRandomString(),
                    label: `Dépense #${index}`,
                    emoji: getRandomEmoji() as Emoji,
                    origin: 'Claire',
                    total: Math.random() * (9999 - -9999 + 1) + -9999,
                });
            });
    }
}
