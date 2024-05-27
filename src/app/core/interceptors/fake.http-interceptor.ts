import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, delay, of, tap } from 'rxjs';

export class FakeHttpInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        console.log('🛜 Calling server |', req.url);
        return of(new HttpResponse({ status: 200, body: [] })).pipe(
            delay(2000),
        );
    }
}
