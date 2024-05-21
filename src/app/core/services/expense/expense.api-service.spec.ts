import { ExpenseAPIService } from './expense.api-service';
import { HttpClientServiceSpy } from '../../../../../test/doubles/http-client.service.spy';

describe('ExpenseAPIService', () => {
    let sut: ExpenseAPIService;
    let httpClientService: HttpClientServiceSpy;

    beforeEach(() => {
        httpClientService = new HttpClientServiceSpy();
        sut = new ExpenseAPIService(httpClientService);
    });

    describe('data was not fetched before', () => {
        it('should get expenses from API', () => {
            sut.expenses;
            expect(httpClientService.calls.get.count).toBe(1);
        });
    });

    describe('data was already fetched once', () => {
        beforeEach(() => sut.expenses);

        it('should get expenses from cache', () => {
            sut.expenses;
            expect(httpClientService.calls.get.count).toBe(1);
        });
    });
});
