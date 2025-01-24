import { DefaultHttpClientService } from '@core/services/http-client/default-http-client.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { InjectionToken, Provider } from '@angular/core';

export const HttpClientServiceToken = new InjectionToken<HttpClientService>(
    'HttpClientService',
);

const httpClientServiceFactory = (httpClient: HttpClient) =>
    new DefaultHttpClientService(httpClient);

export const HttpClientServiceProvider: Provider = {
    provide: HttpClientServiceToken,
    useFactory: httpClientServiceFactory,
    deps: [HttpClient],
};
