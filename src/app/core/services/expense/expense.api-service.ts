import {
    AddGroupExpenseDTO,
    AddPairExpenseDTO,
    ExpenseService,
} from '@core/services/expense/expense.service';
import { ContactV2 } from '@core/model/contact/contact';
import { Filters } from '@core/model/filters/filters';
import { generateRandomDate } from '@shared/utils/get-random-date';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { getRandomEmoji } from '@shared/utils/get-random-emoji';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map } from 'rxjs';
import { QueryService } from '@core/services/query/query.service';
import { PairExpense, PairExpenses } from '@core/model/expense/v2/pair-expense';
import {
    PairExpenseDTO,
    PairExpenseDTOs,
} from '@core/model/expense/v2/pair-expense.dto';
import { generateRandomBalance } from '@shared/utils/generate-random-balance';
import { generateRandomName } from '@shared/utils/generate-random-name';
import { getRandomAvatarUrl } from '@shared/utils/generate-random-avatar-url';

export class ExpenseAPIService implements ExpenseService {
    private readonly endpoint = '/api/expense';

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    addGroupExpense(payload: AddGroupExpenseDTO): Observable<void> {
        return this.httpClientService.post(`${this.endpoint}/group`, payload);
    }

    addPairExpense(payload: AddPairExpenseDTO): Observable<void> {
        return this.httpClientService.post(`${this.endpoint}/pair`, payload);
    }

    getContactExpenses(
        contactId: string,
        pageIndex = 0,
        filters?: Filters,
    ): Observable<PairExpenses> {
        const query = this.queryService.buildQueryFrom({
            pageIndex,
            filters,
        });

        return this.httpClientService
            .get(`${this.endpoint}/contact/${contactId}${query}`)
            .pipe(
                map(() => this.getRandomPairExpenseDTOs()),
                map((expenses) => this.mapPairExpenses(expenses)),
            );
    }

    private mapPairExpenses(expenses: PairExpenseDTOs): PairExpenses {
        return expenses.map((expense) => this.mapPairExpense(expense));
    }

    private mapPairExpense(expense: PairExpenseDTO): PairExpense {
        return new PairExpense(
            {
                id: expense.id,
                label: expense.label,
                emoji: expense.emoji,
                date: new Date(expense.date),
            },
            expense.balance,
            new ContactV2({
                id: expense.counterparty.id,
                firstname: expense.counterparty.firstname,
                lastname: expense.counterparty.lastname,
                avatarUrl: expense.counterparty.avatarUrl,
            }),
        );
    }

    getExpense(id: string): Observable<PairExpense> {
        return this.httpClientService.get(`${this.endpoint}/${id}`).pipe(
            map(() => this.getRandomPairExpenseDTO(0)),
            map((expense) => this.mapPairExpense(expense)),
        );
    }

    getExpenses(pageIndex = 0, filters?: Filters): Observable<PairExpenses> {
        const query = this.queryService.buildQueryFrom({ pageIndex, filters });

        return this.httpClientService.get(`${this.endpoint}${query}`).pipe(
            map(() => this.getRandomPairExpenseDTOs()),
            map((expenses) => this.mapPairExpenses(expenses)),
        );
    }

    getGroupExpenses(
        groupId: string,
        pageIndex = 0,
        filters?: Filters,
    ): Observable<PairExpenses> {
        const query = this.queryService.buildQueryFrom({
            pageIndex,
            filters,
        });

        return this.httpClientService
            .get(`${this.endpoint}/group/${groupId}${query}`)
            .pipe(
                map(() => this.getRandomPairExpenseDTOs()),
                map((expenses) => this.mapPairExpenses(expenses)),
            );
    }

    payback(id: string): Observable<void> {
        return this.httpClientService.patch(
            `${this.endpoint}/payback?expenseId=${id}`,
        );
    }

    private getRandomPairExpenseDTOs(): PairExpenseDTOs {
        return Array.from({ length: 20 }).map((_, index) =>
            this.getRandomPairExpenseDTO(index),
        );
    }

    private getRandomPairExpenseDTO(index: number): PairExpenseDTO {
        return {
            id: generateRandomString(),
            label: `Dépense #${index}`,
            emoji: getRandomEmoji(),
            date: generateRandomDate().toISOString(),
            balance: generateRandomBalance(),
            counterparty: {
                id: generateRandomString(),
                firstname: generateRandomName().firstname,
                lastname: generateRandomName().lastname,
                avatarUrl: getRandomAvatarUrl(),
            },
        };
    }
}
