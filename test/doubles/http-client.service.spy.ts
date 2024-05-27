import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, of } from 'rxjs';
import { Spy } from '@test/model/spy';

export class HttpClientServiceSpy implements Spy<HttpClientService> {
    calls = {
        get: {
            count: 0,
            history: [] as string[],
        },
    };

    get<T>(url: string): Observable<T> {
        this.incrementCallsToGetWith(url);
        return of({}) as Observable<T>;
    }

    incrementCallsToGetWith(url: string): void {
        this.calls.get.count++;
        this.calls.get.history.push(url);
    }
}
