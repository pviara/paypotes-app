import { HttpClientService } from '@core/services/http-client/http-client.service';
import { HttpClientServiceToken } from '@core/services/http-client/http-client.service.provider';
import { InjectionToken, Provider } from '@angular/core';
import { QueryService } from '@core/services/query/query.service';
import { QueryServiceToken } from '@core/services/query/query.service.provider';
import { UserAPIService } from './user.api-service';
import { UserService } from './user.service';

export const UserServiceToken = new InjectionToken<UserService>('UserService');

const userServiceFactory = (
    httpClientService: HttpClientService,
    queryService: QueryService,
) => new UserAPIService(httpClientService, queryService);

export const UserServiceProvider: Provider = {
    provide: UserServiceToken,
    useFactory: userServiceFactory,
    deps: [HttpClientServiceToken, QueryServiceToken],
};
