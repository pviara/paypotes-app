import { GroupAPIService } from '@core/services/group/group.api-service';
import { HttpClientServiceSpy } from '@test/doubles/http-client.service.spy';
import {
    QueryServiceSpy,
    stubBuildQueryFrom,
} from '@test/doubles/query.service.spy';
import { Subscription } from 'rxjs';

describe('GroupAPIService', () => {
    let sut: GroupAPIService;

    let httpClientService: HttpClientServiceSpy;
    let queryService: QueryServiceSpy;

    const subscription = new Subscription();

    beforeEach(() => {
        httpClientService = new HttpClientServiceSpy();
        queryService = new QueryServiceSpy();

        sut = new GroupAPIService(httpClientService, queryService);
    });

    afterAll(() => subscription.unsubscribe());

    it('should get groups from server', () => {
        sut.getGroups().subscribe(() => {
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
            stubBuildQueryFrom(queryService, `search=${search}`);

            subscription.add(
                sut.getGroups(0, { search }).subscribe(() => {
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
            stubBuildQueryFrom(queryService, `?pageIndex=${pageIndex}`);

            subscription.add(
                sut.getGroups(pageIndex).subscribe(() => {
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
            stubBuildQueryFrom(queryService, expectedQueryString);

            subscription.add(
                sut.getGroups(pageIndex, { search }).subscribe(() => {
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
            stubBuildQueryFrom(queryService, expectedQueryString);

            subscription.add(
                sut.getGroups(0, { type }).subscribe(() => {
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
