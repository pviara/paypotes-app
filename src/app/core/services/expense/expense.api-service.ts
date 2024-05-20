import { Expense, Expenses } from '../../model/expense';
import { ExpenseService } from './expense.service';
import { HttpClientService } from '../http-client/http-client.service';
import { map, shareReplay } from 'rxjs';

export class ExpenseAPIService implements ExpenseService {
    private readonly dummyExpenseList: Expenses = [
        new Expense({
            id: 'A',
            name: 'le film était naze',
            emoji: '🎥',
            amount: 1490,
        }),
        new Expense({
            id: 'B',
            name: "rendez l'argent",
            emoji: '⛽',
            amount: 8401,
        }),
        new Expense({
            id: 'C',
            name: 'paye tes verres',
            emoji: '🍺',
            amount: 1600,
        }),
        new Expense({
            id: 'D',
            name: 'pizzzzaaaa',
            emoji: '🍕',
            amount: 1390,
        }),
        new Expense({
            id: 'E',
            name: 'courses',
            emoji: '🛒',
            amount: 1995,
        }),
    ];

    expenses = this.httpClientService.get<unknown>('api_url_to_group').pipe(
        map(() => this.dummyExpenseList),
        shareReplay(1),
    );

    constructor(private httpClientService: HttpClientService) {}
}
