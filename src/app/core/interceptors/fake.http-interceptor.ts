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
        return of(new HttpResponse({ status: 200 })).pipe(delay(2000));
    }
}
