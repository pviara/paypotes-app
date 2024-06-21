import { ExpenseAPIService } from '@core/services/expense/expense.api-service';
import { HttpClientServiceSpy } from '@test/doubles/http-client.service.spy';
import { Subscription } from 'rxjs';

describe('ExpenseAPIService', () => {
    let sut: ExpenseAPIService;
    let httpClientService: HttpClientServiceSpy;

    const subscription = new Subscription();

    beforeEach(() => {
        httpClientService = new HttpClientServiceSpy();
        sut = new ExpenseAPIService(httpClientService);
    });

    afterAll(() => subscription.unsubscribe());

    describe('getExpense', () => {
        it('should get expense from server', () => {
            const expenseId = 'expenseId';

            sut.getExpense(expenseId).subscribe(() => {
                expect(httpClientService.calls.get.count).toBe(1);

                const [call] = httpClientService.calls.get.history;
                const clientHasBeenCalledWithParam = call.includes(
                    `/${expenseId}`,
                );
                expect(clientHasBeenCalledWithParam).toBe(true);
            });
        });
    });

    describe('getExpenses', () => {
        it('should get expenses from server', () => {
            sut.getExpenses().subscribe(() => {
                expect(httpClientService.calls.get.count).toBe(1);

                const [call] = httpClientService.calls.get.history;
                const clientHasNotBeenCalledWithAnyElement =
                    !call.includes('search') && !call.includes('type');
                expect(clientHasNotBeenCalledWithAnyElement).toBe(true);
            });
        });

        describe('search', () => {
            it('should get the expenses from server', () => {
                const search = 'labelXYZ';
                subscription.add(
                    sut.getExpenses(0, { search }).subscribe(() => {
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

        describe('pageIndex', () => {
            it('should get the expenses from server', () => {
                const pageIndex = 1;
                subscription.add(
                    sut.getExpenses(pageIndex).subscribe(() => {
                        expect(httpClientService.calls.get.count).toBe(1);

                        const [call] = httpClientService.calls.get.history;
                        const clientHasBeenCalledWithSearch = call.includes(
                            `?pageIndex=${pageIndex}`,
                        );
                        expect(clientHasBeenCalledWithSearch).toBe(true);
                    }),
                );
            });
        });

        describe('pageIndex and search', () => {
            it('should get the expenses from server', () => {
                const pageIndex = 1;
                const search = 'ABC';
                subscription.add(
                    sut.getExpenses(pageIndex, { search }).subscribe(() => {
                        expect(httpClientService.calls.get.count).toBe(1);

                        const [call] = httpClientService.calls.get.history;
                        const clientCalledWithSearchAndPage = call.includes(
                            `?pageIndex=${pageIndex}&search=${search}`,
                        );
                        expect(clientCalledWithSearchAndPage).toBe(true);
                    }),
                );
            });
        });

        describe('type', () => {
            it('should get the expenses from server', () => {
                const type = 'debt';
                subscription.add(
                    sut.getExpenses(0, { type }).subscribe(() => {
                        expect(httpClientService.calls.get.count).toBe(1);

                        const [call] = httpClientService.calls.get.history;
                        const clientHasBeenCalledWithType = call.includes(
                            `&type=${type}`,
                        );
                        expect(clientHasBeenCalledWithType).toBe(true);
                    }),
                );
            });
        });
    });

    describe('getGroupExpenses', () => {
        it('should get group expenses from server', () => {
            const groupId = 'groupId';
            sut.getGroupExpenses(groupId).subscribe(() => {
                expect(httpClientService.calls.get.count).toBe(1);

                const [call] = httpClientService.calls.get.history;
                const clientHasBeenCalledWithGroupId = call.includes(
                    `groupId=${groupId}`,
                );
                expect(clientHasBeenCalledWithGroupId).toBe(true);
            });
        });
    });
});
