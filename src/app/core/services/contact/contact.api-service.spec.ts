import { ContactAPIService } from '@core/services/contact/contact.api-service';
import { HttpClientServiceSpy } from '@test/doubles/http-client.service.spy';
import { QueryServiceSpy } from '@test/doubles/query.service.spy';
import { Subscription } from 'rxjs';

describe('ContactAPIService', () => {
    let sut: ContactAPIService;

    let httpClientService: HttpClientServiceSpy;
    let queryService: QueryServiceSpy;

    const subscription = new Subscription();

    beforeEach(() => {
        httpClientService = new HttpClientServiceSpy();
        queryService = new QueryServiceSpy();

        sut = new ContactAPIService(httpClientService, queryService);
    });

    afterAll(() => subscription.unsubscribe());

    it('should get contacts from server', () => {
        sut.getContactsWithBalance().subscribe(() => {
            expect(httpClientService.calls.get.count).toBe(1);

            const [call] = httpClientService.calls.get.history;
            const clientHasNotBeenCalledWithAnyElement =
                !call.includes('search') && !call.includes('type');

            expect(clientHasNotBeenCalledWithAnyElement).toBe(true);
        });
    });

    describe('search', () => {
        it('should get the contacts from server', () => {
            const search = 'labelXYZ';

            const expectedQueryString = `search=${search}`;
            queryService.stub('buildQueryFrom', `search=${search}`);

            subscription.add(
                sut.getContactsWithBalance(0, { search }).subscribe(() => {
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
        it('should get the contacts from server', () => {
            const pageIndex = 1;

            const expectedQueryString = `?pageIndex=${pageIndex}`;
            queryService.stub('buildQueryFrom', `?pageIndex=${pageIndex}`);

            subscription.add(
                sut.getContactsWithBalance(pageIndex).subscribe(() => {
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
        it('should get the contacts from server', () => {
            const pageIndex = 1;
            const search = 'ABC';

            const expectedQueryString = `?pageIndex=${pageIndex}&search=${search}`;
            queryService.stub('buildQueryFrom', expectedQueryString);

            subscription.add(
                sut
                    .getContactsWithBalance(pageIndex, { search })
                    .subscribe(() => {
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
        it('should get the contacts from server', () => {
            const type = 'debt';

            const expectedQueryString = `&type=${type}`;
            queryService.stub('buildQueryFrom', expectedQueryString);

            subscription.add(
                sut.getContactsWithBalance(0, { type }).subscribe(() => {
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
