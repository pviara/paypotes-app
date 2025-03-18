import { HttpClientServiceSpy } from '@test/doubles/http-client.service.spy';
import { QueryServiceSpy } from '@test/doubles/query.service.spy';
import { Subscription } from 'rxjs';
import { UserAPIService } from '@core/services/user/user.api-service';

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

    describe('get user by their name', () => {
        it('should get the user from server', () => {
            const name = 'Peter Parker';

            const expectedQueryString = `name=${name}`;
            queryService.stub('buildQueryFrom', `name=${name}`);

            subscription.add(
                sut.getUserByName(name).subscribe(() => {
                    expect(httpClientService.calls.get.count).toBe(1);

                    const [call] = httpClientService.calls.get.history;
                    const clientHasBeenCalledWithName =
                        call.includes(expectedQueryString);

                    expect(clientHasBeenCalledWithName).toBe(true);
                }),
            );
        });
    });

    describe('get user by their phone', () => {
        it('should get the user from server', () => {
            const phoneNumber = '0781228931';

            const expectedQueryString = `phoneNumber=${phoneNumber}`;
            queryService.stub('buildQueryFrom', `phoneNumber=${phoneNumber}`);

            subscription.add(
                sut.getUserByPhone(phoneNumber).subscribe(() => {
                    expect(httpClientService.calls.get.count).toBe(1);

                    const [call] = httpClientService.calls.get.history;
                    const clientHasBeenCalledWithPhoneNumber =
                        call.includes(expectedQueryString);

                    expect(clientHasBeenCalledWithPhoneNumber).toBe(true);
                }),
            );
        });
    });
});
