import { InjectionToken, Provider } from '@angular/core';
import { QueryDefaultService } from '@core/services/query/query.default-service';
import { QueryService } from '@core/services/query/query.service';

export const QueryServiceToken = new InjectionToken<QueryService>(
    'QueryService',
);

export const QueryServiceProvider: Provider = {
    provide: QueryServiceToken,
    useClass: QueryDefaultService,
};
