import { DefaultHttpClientService } from './default-http-client.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from './http-client.service';
import { InjectionToken, Provider } from '@angular/core';

export const HttpClientServiceToken = new InjectionToken<HttpClientService>(
    'HttpClientService',
);

export const DefaultHttpClientServiceProvider: Provider = {
    provide: HttpClientServiceToken,
    useFactory: (httpClient: HttpClient) =>
        new DefaultHttpClientService(httpClient),
    deps: [HttpClient],
};
