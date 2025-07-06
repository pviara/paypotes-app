import { AuthService } from '@core/services/auth/auth.service';
import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { HttpClientServiceToken } from '@core/services/http-client/http-client.service.provider';
import { InjectionToken, Provider } from '@angular/core';
import { QueryService } from '@core/services/query/query.service';
import { QueryServiceToken } from '@core/services/query/query.service.provider';
import { UserAPIService } from '@core/services/user/user.api-service';
import { UserService } from '@core/services/user/user.service';

export const UserServiceToken = new InjectionToken<UserService>('UserService');

const userServiceFactory = (
    authService: AuthService,
    httpClientService: HttpClientService,
    queryService: QueryService,
) => new UserAPIService(authService, httpClientService, queryService);

export const UserServiceProvider: Provider = {
    provide: UserServiceToken,
    useFactory: userServiceFactory,
    deps: [AuthServiceToken, HttpClientServiceToken, QueryServiceToken],
};
