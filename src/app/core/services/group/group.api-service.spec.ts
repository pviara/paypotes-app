import { GroupAPIService } from './group.api-service';
import { HttpClientServiceSpy } from '@test/doubles/http-client.service.spy';

describe('GroupAPIService', () => {
    let sut: GroupAPIService;
    let httpClientService: HttpClientServiceSpy;

    beforeEach(() => {
        httpClientService = new HttpClientServiceSpy();
        sut = new GroupAPIService(httpClientService);
    });

    describe('data was not fetched before', () => {
        it('should get groups from API', () => {
            sut.groups;
            expect(httpClientService.calls.get.count).toBe(1);
        });
    });

    describe('data was already fetched once', () => {
        beforeEach(() => sut.groups);

        it('should get groups from cache', () => {
            sut.groups;
            expect(httpClientService.calls.get.count).toBe(1);
        });
    });
});
