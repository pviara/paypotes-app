import { ContactAPIService } from '@core/services/contact/contact.api-service';
import { ContactService } from '@core/services/contact/contact.service';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { HttpClientServiceToken } from '@core/services/http-client/http-client.service.provider';
import { InjectionToken, Provider } from '@angular/core';

export const ContactServiceToken = new InjectionToken<ContactService>(
    'ContactService',
);

const contactServiceFactory = (httpClientService: HttpClientService) =>
    new ContactAPIService(httpClientService);

export const ContactServiceProvider: Provider = {
    provide: ContactServiceToken,
    useFactory: contactServiceFactory,
    deps: [HttpClientServiceToken],
};
