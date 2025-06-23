import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, of } from 'rxjs';
import { Spy } from '@test/model/spy';

export class HttpClientServiceSpy
    extends Spy<HttpClientService>
    implements HttpClientService
{
    override readonly calls = {
        get: {
            count: 0,
            history: [] as Array<string>,
        },
        getText: {
            count: 0,
            history: [] as Array<string>,
        },
        put: {
            count: 0,
            history: [] as Array<string>,
        },
        post: {
            count: 0,
            history: [] as Array<string>,
        },
    };

    get<T>(url: string): Observable<T> {
        this.saveCall('get', url);
        return this.getStubOrDefault('get', of({})) as Observable<T>;
    }

    getText(url: string): Observable<string> {
        this.saveCall('getText', url);
        return this.getStubOrDefault('getText', of(''));
    }

    put(url: string): Observable<void> {
        return of();
    }

    post(url: string): Observable<void> {
        this.saveCall('post', url);
        return of();
    }
}
