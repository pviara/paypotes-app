import { AuthServiceSpy } from '@test/doubles/auth.service.spy';
import { HttpClientServiceSpy } from '@test/doubles/http-client.service.spy';
import { QueryServiceSpy } from '@test/doubles/query.service.spy';
import { of, Subscription } from 'rxjs';
import { UserAPIService } from '@core/services/user/user.api-service';

describe('UserAPIService', () => {
    let sut: UserAPIService;

    let authService: AuthServiceSpy;
    let httpClientService: HttpClientServiceSpy;
    let queryService: QueryServiceSpy;

    const subscription = new Subscription();

    beforeEach(() => {
        initDependencies();
        sut = new UserAPIService(authService, httpClientService, queryService);
    });

    afterAll(() => subscription.unsubscribe());

    describe('get user by their name', () => {
        it('should get the user from server', () => {
            const name = 'Peter Parker';

            const expectedQueryString = `name=${name}`;
            queryService.stub('buildQueryFrom', `name=${name}`);

            httpClientService.stub('get', of([]));

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

    function initDependencies(): void {
        authService = new AuthServiceSpy();
        httpClientService = new HttpClientServiceSpy();
        queryService = new QueryServiceSpy();
    }
});
