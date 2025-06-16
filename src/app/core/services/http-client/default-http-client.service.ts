import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export class DefaultHttpClientService implements HttpClientService {
    private platformId = inject(PLATFORM_ID);

    constructor(private httpClient: HttpClient) {}

    get<T>(url: string): Observable<T> {
        return this.httpClient
            .get<T>(url)
            .pipe(delay(isPlatformBrowser(this.platformId) ? 1000 : 0));
    }

    getText(url: string): Observable<string> {
        return this.httpClient
            .get(url, { responseType: 'text' })
            .pipe(delay(isPlatformBrowser(this.platformId) ? 1000 : 0));
    }

    put(url: string, payload: unknown): Observable<void> {
        return this.httpClient
            .put<void>(url, payload)
            .pipe(delay(isPlatformBrowser(this.platformId) ? 1000 : 0));
    }

    post(url: string, payload: unknown): Observable<void> {
        return this.httpClient
            .post<void>(url, payload)
            .pipe(delay(isPlatformBrowser(this.platformId) ? 1000 : 0));
    }
}
