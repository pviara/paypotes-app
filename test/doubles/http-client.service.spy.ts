import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, of } from 'rxjs';
import { Spy } from '../model/spy';

export class HttpClientServiceSpy implements Spy<HttpClientService> {
    calls = {
        get: {
            count: 0,
        },
    };

    get<T>(url: string): Observable<T> {
        this.calls.get.count++;
        return of({}) as Observable<T>;
    }
}
