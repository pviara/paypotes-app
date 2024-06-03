import { Emoji } from '@core/model/emoji';
import { Expense, Expenses } from '@core/model/expense/expense';
import { ExpenseService } from '@core/services/expense/expense.service';
import { Filters } from '@core/model/expense/filters';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { getRandomEmoji } from '@shared/utils/get-random-emoji';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map } from 'rxjs';

export class ExpenseAPIService implements ExpenseService {
    private readonly endpoint = 'api_url_to_expense';

    constructor(private httpClientService: HttpClientService) {}

    getExpense(id: string): Observable<Expense> {
        return this.httpClientService
            .get<Expense>(`${this.endpoint}/${id}`)
            .pipe(map(() => this.getRandomExpense(999)));
    }

    getExpenses(pageIndex = 0, filters?: Filters): Observable<Expenses> {
        const url = this.buildURLWith(pageIndex, filters);

        return this.httpClientService
            .get<Expenses>(url)
            .pipe(map(this.getRandomExpenses()));
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
            Array.from({ length: 20 }).map((_, index) =>
                this.getRandomExpense(index),
            );
    }

    private getRandomExpense(index: number): Expense {
        return new Expense({
            id: generateRandomString(),
            label: `Dépense #${index}`,
            emoji: getRandomEmoji() as Emoji,
            origin: 'Claire',
            balance: Math.ceil(Math.random() * (9999 - -9999 + 1) + -9999),
        });
    }
}
