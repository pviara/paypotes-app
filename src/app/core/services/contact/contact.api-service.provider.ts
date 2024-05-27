import { ContactAPIService } from '@core/services/contact/contact.api-service';
import { ContactService } from '@core/services/contact/contact.service';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { HttpClientServiceToken } from '@core/services/http-client/http-client.service.provider';
import { InjectionToken, Provider } from '@angular/core';

export const ExpenseServiceToken = new InjectionToken<ContactService>(
    'ContactService',
);

const contactServiceFactory = (httpClientService: HttpClientService) =>
    new ContactAPIService(httpClientService);

export const ExpenseServiceProvider: Provider = {
    provide: ExpenseServiceToken,
    useFactory: contactServiceFactory,
    deps: [HttpClientServiceToken],
};
