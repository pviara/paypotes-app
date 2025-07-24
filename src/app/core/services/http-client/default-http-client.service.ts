import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
    HttpClientService,
    RequestOptions,
} from '@core/services/http-client/http-client.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export class DefaultHttpClientService implements HttpClientService {
    private platformId = inject(PLATFORM_ID);

    constructor(private httpClient: HttpClient) {}

    get<T>(url: string, options: Partial<RequestOptions>): Observable<T> {
        return this.httpClient
            .get<T>(url, this.buildOptionsFrom(options))
            .pipe(delay(isPlatformBrowser(this.platformId) ? 700 : 0));
    }

    getText(url: string, options: Partial<RequestOptions>): Observable<string> {
        return this.httpClient
            .get(url, {
                responseType: 'text',
                ...this.buildOptionsFrom(options),
            })
            .pipe(delay(isPlatformBrowser(this.platformId) ? 700 : 0));
    }

    put(
        url: string,
        payload: unknown,
        options: Partial<RequestOptions>,
    ): Observable<void> {
        return this.httpClient
            .put<void>(url, payload, this.buildOptionsFrom(options))
            .pipe(delay(isPlatformBrowser(this.platformId) ? 700 : 0));
    }

    post<T = void>(
        url: string,
        payload: unknown,
        options: Partial<RequestOptions>,
    ): Observable<T> {
        return this.httpClient
            .post<T>(url, payload, this.buildOptionsFrom(options))
            .pipe(delay(isPlatformBrowser(this.platformId) ? 700 : 0));
    }

    private buildOptionsFrom({
        headers,
        observeResponse,
    }: Partial<RequestOptions>): Record<string, any> {
        const options: Record<string, any> = { headers };
        if (observeResponse) options['observe'] = 'response';

        return options;
    }
}
