import { GroupAPIService } from './group.api-service';
import { GroupService } from './group.service';
import { HttpClientService } from '../http-client/http-client.service';
import { HttpClientServiceToken } from '../http-client/default-http-client.service.provider';
import { InjectionToken, Provider } from '@angular/core';

export const GroupAPIServiceToken = new InjectionToken<GroupService>(
    'GroupAPIService',
);

export const GroupAPIServiceProvider: Provider = {
    provide: GroupAPIServiceToken,
    useFactory: (httpClientService: HttpClientService) =>
        new GroupAPIService(httpClientService),
    deps: [HttpClientServiceToken],
};
