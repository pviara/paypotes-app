import { Emoji } from '@core/model/emoji';
import { Expense, Expenses } from '@core/model/expense/expense';
import { ExpenseService } from '@core/services/expense/expense.service';
import { Filters } from '@core/model/expense/filters';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { getRandomEmoji } from '@shared/utils/get-random-emoji';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, of, tap } from 'rxjs';

export class ExpenseAPIService implements ExpenseService {
    private cachedExpenses: Expenses = [];

    private readonly endpoint = 'api_url_to_expense';

    constructor(private httpClientService: HttpClientService) {}

    getExpenses({ pageIndex, search }: Filters): Observable<Expenses> {
        if (pageIndex) {
            return this.getExpensesFromClient({ pageIndex, search });
        }

        if (search) {
            return this.getMatchesFor(search);
        }
        return this.getExpensesFromClient({});
    }

    private getMatchesFor(search: string) {
        const matches = this.getFromCacheFor(search);
        return matches.length > 0
            ? of(matches)
            : this.getExpensesFromClient({ search });
    }

    private getFromCacheFor(search: string): Expenses {
        return this.cachedExpenses.filter((expense) =>
            expense.getLabel().toLowerCase().includes(search.toLowerCase()),
        );
    }

    private getExpensesFromClient({
        pageIndex,
        search,
    }: Filters): Observable<Expenses> {
        const url = this.buildURLWith({ pageIndex, search });

        return this.httpClientService.get<Expenses>(url).pipe(
            tap((expenses) => {
                this.cachedExpenses = this.cachedExpenses.concat(expenses);
            }),
        );
    }

    private buildURLWith({ pageIndex, search }: Filters): string {
        let url = this.endpoint;
        if (pageIndex && search) {
            url += `?pageIndex=${pageIndex}&search=${search}`;
        } else if (pageIndex) {
            url += `?pageIndex=${pageIndex}`;
        } else if (search) {
            url += `?search=${search}`;
        }
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
