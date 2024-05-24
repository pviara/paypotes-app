import { Emoji } from '@core/model/emoji';
import { Expense } from '../../model/expense/expense';
import { ExpenseService } from './expense.service';
import { HttpClientService } from '../http-client/http-client.service';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { getRandomEmoji } from '@shared/utils/get-random-emoji';
import { map, shareReplay } from 'rxjs';

export class ExpenseAPIService implements ExpenseService {
    private readonly randomExpenseList = Array.from({ length: 40 }).map(
        (_, index) => {
            return new Expense({
                id: generateRandomString(),
                label: `Dépense #${index}`,
                emoji: getRandomEmoji() as Emoji,
                origin: 'Claire',
                total: Math.random() * (200 - -120) + -120,
            });
        },
    );

    expenses = this.httpClientService.get<unknown>('api_url_to_expense').pipe(
        map(() => this.randomExpenseList),
        shareReplay(1),
    );

    constructor(private httpClientService: HttpClientService) {}
}
