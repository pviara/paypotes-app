import { GroupAPIService } from '@core/services/group/group.api-service';
import { GroupService } from '@core/services/group/group.service';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { HttpClientServiceToken } from '@core/services/http-client/http-client.service.provider';
import { InjectionToken, Provider } from '@angular/core';

export const GroupServiceToken = new InjectionToken<GroupService>(
    'GroupService',
);

const groupServiceFactory = (httpClientService: HttpClientService) =>
    new GroupAPIService(httpClientService);

export const GroupServiceProvider: Provider = {
    provide: GroupServiceToken,
    useFactory: groupServiceFactory,
    deps: [HttpClientServiceToken],
};
