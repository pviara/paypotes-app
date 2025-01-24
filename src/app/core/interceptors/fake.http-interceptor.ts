import { isPlatformBrowser } from '@angular/common';
import {
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export const fakeHttpInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
    const platformId = inject(PLATFORM_ID);

    console.log('🛜 [HttpClient] Calling server at', req.method, req.url);
    if (req.body) {
        console.log(req.body);
    }

    return of(new HttpResponse({ status: 200, body: [] })).pipe(
        delay(isPlatformBrowser(platformId) ? 1500 : 0),
    );
};
