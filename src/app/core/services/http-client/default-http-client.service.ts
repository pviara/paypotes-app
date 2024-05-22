import { HttpClient } from '@angular/common/http';
import { HttpClientService } from './http-client.service';
import { Observable, of } from 'rxjs';

export class DefaultHttpClientService implements HttpClientService {
    constructor(private httpClient: HttpClient) {}

    get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(url);
    }
}
