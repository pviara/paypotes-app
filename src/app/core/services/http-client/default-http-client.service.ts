import { HttpClient } from '@angular/common/http';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';

export class DefaultHttpClientService implements HttpClientService {
    constructor(private httpClient: HttpClient) {}

    get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(url);
    }

    patch(url: string): Observable<void> {
        return this.httpClient.patch<void>(url, {});
    }

    post(url: string, payload: unknown): Observable<void> {
        return this.httpClient.post<void>(url, payload);
    }
}
