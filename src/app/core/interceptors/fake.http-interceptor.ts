import {
    HttpEvent,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, delay, of, tap } from 'rxjs';

export class FakeHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>): Observable<HttpEvent<unknown>> {
        console.log('🛜 Calling server at', req.method, req.url, req.body);
        return of(new HttpResponse({ status: 200, body: [] })).pipe(
            delay(2000),
        );
    }
}
