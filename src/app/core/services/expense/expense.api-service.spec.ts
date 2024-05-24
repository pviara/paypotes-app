import { Expense, Expenses } from '@core/model/expense/expense';
import { ExpenseAPIService } from '@core/services/expense/expense.api-service';
import { HttpClientServiceSpy } from '@test/doubles/http-client.service.spy';
import { Subscription, of } from 'rxjs';

describe('ExpenseAPIService', () => {
    let sut: ExpenseAPIService;
    let httpClientService: HttpClientServiceSpy;

    const subscription = new Subscription();

    const dummyExpenses: Expenses = [
        new Expense({
            id: 'A',
            label: 'labelA',
            emoji: '⚾️',
            origin: 'Claire',
            total: 150,
        }),
        new Expense({
            id: 'B',
            label: 'labelB',
            emoji: '⚾️',
            origin: 'Nathaniel',
            total: -3342,
        }),
    ];

    beforeEach(() => {
        httpClientService = new HttpClientServiceSpy();
        sut = new ExpenseAPIService(httpClientService);
    });

    afterAll(() => subscription.unsubscribe());

    describe('data was not fetched before', () => {
        it('should get expenses from server', () => {
            sut.getExpenses().subscribe();
            expect(httpClientService.calls.get.count).toBe(1);
        });
    });

    describe('search', () => {
        it('should get the expense from cache when search points to a cached one', () => {
            stubGetInClientWith(dummyExpenses);

            subscription.add(sut.getExpenses().subscribe());

            const expenseToFind = dummyExpenses[0];
            const search = expenseToFind.getLabel();

            subscription.add(
                sut.getExpenses(search).subscribe((expenses) => {
                    const [result] = expenses;
                    expect(httpClientService.calls.get.count).toBe(1);
                    expect(result.getId()).toBe(expenseToFind.getId());
                }),
            );
        });

        it('should get the expense from client when cache does not contain the right expense', () => {
            const search = 'labelXYZ';
            subscription.add(
                sut.getExpenses(search).subscribe((expenses) => {
                    expect(httpClientService.calls.get.count).toBe(1);

                    const [call] = httpClientService.calls.get.history;
                    const clientHasBeenCalledWithSearch = call.includes(
                        `search=${search}`,
                    );
                    expect(clientHasBeenCalledWithSearch).toBe(true);
                }),
            );
        });
    });

    function stubGetInClientWith(expenses: Expenses): void {
        httpClientService.get<Expenses> = (url: string) => {
            httpClientService.incrementCallsToGetWith(url);
            return of(expenses);
        };
    }
});
