import { FakeHttpInterceptor } from '@core/interceptors/fake.http-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

export const HttpInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeHttpInterceptor,
    multi: true,
};
