import { HttpClientServiceSpy } from '@test/doubles/http-client.service.spy';
import {
    QueryServiceSpy,
    stubBuildQueryFrom,
} from '@test/doubles/query.service.spy';
import { Subscription } from 'rxjs';
import { UserAPIService } from './user.api-service';

describe('UserAPIService', () => {
    let sut: UserAPIService;

    let httpClientService: HttpClientServiceSpy;
    let queryService: QueryServiceSpy;

    const subscription = new Subscription();

    beforeEach(() => {
        httpClientService = new HttpClientServiceSpy();
        queryService = new QueryServiceSpy();

        sut = new UserAPIService(httpClientService, queryService);
    });

    afterAll(() => subscription.unsubscribe());

    it('should get the users from server', () => {
        const phoneNumber = '0781228931';

        const expectedQueryString = `phoneNumber=${phoneNumber}`;
        stubBuildQueryFrom(queryService, `phoneNumber=${phoneNumber}`);

        subscription.add(
            sut.getUser(phoneNumber).subscribe(() => {
                expect(httpClientService.calls.get.count).toBe(1);

                const [call] = httpClientService.calls.get.history;
                const clientHasBeenCalledWithPhoneNumber =
                    call.includes(expectedQueryString);

                expect(clientHasBeenCalledWithPhoneNumber).toBe(true);
            }),
        );
    });
});
