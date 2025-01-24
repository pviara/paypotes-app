import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, of } from 'rxjs';
import { Spy } from '@test/model/spy';

export class HttpClientServiceSpy
    extends Spy<HttpClientService>
    implements HttpClientService
{
    get<T>(url: string): Observable<T> {
        this.increment('get', url);
        return this.getStubOrDefault('get', of({})) as Observable<T>;
    }

    patch(url: string): Observable<void> {
        return of();
    }

    post(url: string): Observable<void> {
        this.calls.post.count++;
        return of();
    }
}
