import { HttpClientService } from "../../src/app/core/services/http-client/http-client.service";
import { Observable, of } from "rxjs";

export class HttpClientServiceSpy implements HttpClientService {
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
