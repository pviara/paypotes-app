import { AuthAPIService } from '@core/services/auth/auth.api-service';
import { AuthService } from '@core/services/auth/auth.service';
import { InjectionToken, Provider } from '@angular/core';

export const AuthServiceToken = new InjectionToken<AuthService>('AuthService');

export const AuthServiceProvider: Provider = {
    provide: AuthServiceToken,
    useClass: AuthAPIService,
};
