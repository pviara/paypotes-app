import { delay, map, shareReplay } from 'rxjs';
import { Expense, Expenses } from '../../model/expense/expense';
import { ExpenseService } from './expense.service';
import { HttpClientService } from '../http-client/http-client.service';

export class ExpenseAPIService implements ExpenseService {
    private readonly dummyExpenseList: Expenses = [
        new Expense({
            id: 'A',
            label: 'le film était naze',
            emoji: '🎥',
            total: -1490,
            origin: 'Diego',
        }),
        new Expense({
            id: 'B',
            label: "rendez l'argent",
            emoji: '⛽',
            total: 8401,
            origin: 'Bretagne',
        }),
        new Expense({
            id: 'C',
            label: 'paye tes verres',
            emoji: '🍺',
            total: -1600,
            origin: 'Ahmed',
        }),
        new Expense({
            id: 'D',
            label: 'pizzzzaaaa',
            emoji: '🍕',
            total: 1390,
            origin: 'Valentin',
        }),
        new Expense({
            id: 'E',
            label: 'courses',
            emoji: '🛒',
            total: -1995,
            origin: 'Claire',
        }),
    ];

    expenses = this.httpClientService
        .get<unknown>('api_url_to_group')
        .pipe(delay(2000), map(this.mapDummyExpenseList()), shareReplay(1));

    constructor(private httpClientService: HttpClientService) {}

    private mapDummyExpenseList(): () => Array<Expense> {
        return () => this.dummyExpenseList;
    }
}
