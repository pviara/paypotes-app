import { Emoji } from '@core/model/emoji';
import { Expense, Expenses } from '../../model/expense/expense';
import { ExpenseService } from './expense.service';
import { HttpClientService } from '../http-client/http-client.service';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { getRandomEmoji } from '@shared/utils/get-random-emoji';
import { map, shareReplay } from 'rxjs';

export class ExpenseAPIService implements ExpenseService {
    expenses = this.httpClientService
        .get<unknown>('api_url_to_expense')
        .pipe(map(this.getRandomExpenses()));

    constructor(private httpClientService: HttpClientService) {}

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
