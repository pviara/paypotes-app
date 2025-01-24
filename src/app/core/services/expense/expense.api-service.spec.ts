import { ExpenseAPIService } from '@core/services/expense/expense.api-service';
import { HttpClientServiceSpy } from '@test/doubles/http-client.service.spy';
import { QueryServiceSpy } from '@test/doubles/query.service.spy';
import { Subscription } from 'rxjs';

describe('ExpenseAPIService', () => {
    let sut: ExpenseAPIService;

    let httpClientService: HttpClientServiceSpy;
    let queryService: QueryServiceSpy;

    const subscription = new Subscription();

    beforeEach(() => {
        httpClientService = new HttpClientServiceSpy();
        queryService = new QueryServiceSpy();

        sut = new ExpenseAPIService(httpClientService, queryService);
    });

    afterAll(() => subscription.unsubscribe());

    describe('getContactExpenses', () => {
        it('should get contact expenses from server', () => {
            const contactId = 'contactId';

            const expectedQueryString = `contactId=${contactId}`;
            queryService.stub('buildQueryFrom', expectedQueryString);

            subscription.add(
                sut.getContactExpenses(contactId).subscribe(() => {
                    expect(httpClientService.calls.get.count).toBe(1);

                    const [call] = httpClientService.calls.get.history;
                    const clientHasBeenCalledWithGroupId =
                        call.includes(expectedQueryString);

                    expect(clientHasBeenCalledWithGroupId).toBe(true);
                }),
            );
        });
    });

    describe('getExpense', () => {
        it('should get expense from server', () => {
            const expenseId = 'expenseId';

            subscription.add(
                sut.getExpense(expenseId).subscribe(() => {
                    expect(httpClientService.calls.get.count).toBe(1);

                    const [call] = httpClientService.calls.get.history;
                    const clientHasBeenCalledWithParam = call.includes(
                        `/${expenseId}`,
                    );
                    expect(clientHasBeenCalledWithParam).toBe(true);
                }),
            );
        });
    });

    describe('getExpenses', () => {
        it('should get expenses from server', () => {
            subscription.add(
                sut.getExpenses().subscribe(() => {
                    expect(httpClientService.calls.get.count).toBe(1);

                    const [call] = httpClientService.calls.get.history;
                    const clientHasNotBeenCalledWithAnyElement =
                        !call.includes('search') && !call.includes('type');

                    expect(clientHasNotBeenCalledWithAnyElement).toBe(true);
                }),
            );
        });

        describe('search', () => {
            it('should get the expenses from server', () => {
                const search = 'labelXYZ';

                const expectedQueryString = `search=${search}`;
                queryService.stub('buildQueryFrom', `search=${search}`);

                subscription.add(
                    sut.getExpenses(0, { search }).subscribe(() => {
                        expect(httpClientService.calls.get.count).toBe(1);

                        const [call] = httpClientService.calls.get.history;
                        const clientHasBeenCalledWithSearch =
                            call.includes(expectedQueryString);

                        expect(clientHasBeenCalledWithSearch).toBe(true);
                    }),
                );
            });
        });

        describe('pageIndex', () => {
            it('should get the expenses from server', () => {
                const pageIndex = 1;

                const expectedQueryString = `?pageIndex=${pageIndex}`;
                queryService.stub('buildQueryFrom', `?pageIndex=${pageIndex}`);

                subscription.add(
                    sut.getExpenses(pageIndex).subscribe(() => {
                        expect(httpClientService.calls.get.count).toBe(1);

                        const [call] = httpClientService.calls.get.history;
                        const clientHasBeenCalledWithSearch =
                            call.includes(expectedQueryString);

                        expect(clientHasBeenCalledWithSearch).toBe(true);
                    }),
                );
            });
        });

        describe('pageIndex and search', () => {
            it('should get the expenses from server', () => {
                const pageIndex = 1;
                const search = 'ABC';

                const expectedQueryString = `?pageIndex=${pageIndex}&search=${search}`;
                queryService.stub('buildQueryFrom', expectedQueryString);

                subscription.add(
                    sut.getExpenses(pageIndex, { search }).subscribe(() => {
                        expect(httpClientService.calls.get.count).toBe(1);

                        const [call] = httpClientService.calls.get.history;
                        const clientCalledWithSearchAndPage =
                            call.includes(expectedQueryString);

                        expect(clientCalledWithSearchAndPage).toBe(true);
                    }),
                );
            });
        });

        describe('type', () => {
            it('should get the expenses from server', () => {
                const type = 'debt';

                const expectedQueryString = `&type=${type}`;
                queryService.stub('buildQueryFrom', expectedQueryString);

                subscription.add(
                    sut.getExpenses(0, { type }).subscribe(() => {
                        expect(httpClientService.calls.get.count).toBe(1);

                        const [call] = httpClientService.calls.get.history;
                        const clientHasBeenCalledWithType =
                            call.includes(expectedQueryString);

                        expect(clientHasBeenCalledWithType).toBe(true);
                    }),
                );
            });
        });
    });

    describe('getGroupExpenses', () => {
        it('should get group expenses from server', () => {
            const groupId = 'groupId';

            const expectedQueryString = `groupId=${groupId}`;
            queryService.stub('buildQueryFrom', expectedQueryString);

            sut.getGroupExpenses(groupId).subscribe(() => {
                expect(httpClientService.calls.get.count).toBe(1);

                const [call] = httpClientService.calls.get.history;
                const clientHasBeenCalledWithGroupId =
                    call.includes(expectedQueryString);

                expect(clientHasBeenCalledWithGroupId).toBe(true);
            });
        });
    });
});
