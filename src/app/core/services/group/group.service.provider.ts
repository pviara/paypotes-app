import { GroupAPIService } from './group.api-service';
import { GroupService } from './group.service';
import { HttpClientService } from '../http-client/http-client.service';
import { HttpClientServiceToken } from '../http-client/http-client.service.provider';
import { InjectionToken, Provider } from '@angular/core';

export const GroupAPIServiceToken = new InjectionToken<GroupService>(
    'GroupAPIService',
);

const groupServiceFactory = (httpClientService: HttpClientService) =>
    new GroupAPIService(httpClientService);

export const GroupServiceProvider: Provider = {
    provide: GroupAPIServiceToken,
    useFactory: groupServiceFactory,
    deps: [HttpClientServiceToken],
};
