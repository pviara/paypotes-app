import { Emoji } from '@core/model/emoji';
import { Expense, Expenses } from '@core/model/expense/expense';
import { ExpenseService } from '@core/services/expense/expense.service';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { getRandomEmoji } from '@shared/utils/get-random-emoji';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, of, tap } from 'rxjs';

export class ExpenseAPIService implements ExpenseService {
    private cachedExpenses: Expenses = [];

    constructor(private httpClientService: HttpClientService) {}

    getExpenses(search?: string): Observable<Expenses> {
        if (search) {
            return this.getMatchesFor(search);
        }
        return this.getExpensesFromClient();
    }

    private getMatchesFor(search: string) {
        const matches = this.getFromCacheFor(search);
        return matches.length > 0
            ? of(matches)
            : this.getExpensesFromClient(search);
    }

    private getFromCacheFor(search: string): Expenses {
        return this.cachedExpenses.filter((expense) =>
            expense.getLabel().toLowerCase().includes(search.toLowerCase()),
        );
    }

    private getExpensesFromClient(search?: string): Observable<Expenses> {
        return this.httpClientService
            .get<Expenses>(`api_url_to_expense?search=${search}`)
            .pipe(
                tap((expenses) => {
                    this.cachedExpenses = this.cachedExpenses.concat(expenses);
                }),
            );
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
