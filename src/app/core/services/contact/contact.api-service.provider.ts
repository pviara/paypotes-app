import { AuthService } from '@core/services/auth/auth.service';
import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { ContactAPIService } from '@core/services/contact/contact.api-service';
import { ContactService } from '@core/services/contact/contact.service';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { HttpClientServiceToken } from '@core/services/http-client/http-client.service.provider';
import { InjectionToken, Provider } from '@angular/core';
import { QueryService } from '@core/services/query/query.service';
import { QueryServiceToken } from '@core/services/query/query.service.provider';

export const ContactServiceToken = new InjectionToken<ContactService>(
    'ContactService',
);

const contactServiceFactory = (
    authService: AuthService,
    httpClientService: HttpClientService,
    queryService: QueryService,
) => new ContactAPIService(authService, httpClientService, queryService);

export const ContactServiceProvider: Provider = {
    provide: ContactServiceToken,
    useFactory: contactServiceFactory,
    deps: [AuthServiceToken, HttpClientServiceToken, QueryServiceToken],
};
