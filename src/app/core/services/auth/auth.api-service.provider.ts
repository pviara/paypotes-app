import { AuthAPIService } from '@core/services/auth/auth.api-service';
import { AuthService } from '@core/services/auth/auth.service';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { HttpClientServiceToken } from '@core/services/http-client/http-client.service.provider';
import { InjectionToken, Provider } from '@angular/core';

export const AuthServiceToken = new InjectionToken<AuthService>('AuthService');

const authServiceFactory = (httpClientService: HttpClientService) =>
    new AuthAPIService(httpClientService);

export const AuthServiceProvider: Provider = {
    provide: AuthServiceToken,
    useFactory: authServiceFactory,
    deps: [HttpClientServiceToken],
};
