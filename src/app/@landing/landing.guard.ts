import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';

export const landingGuard: CanActivateFn = (): Observable<boolean> => {
    const authService = inject(AuthServiceToken);
    const router = inject(Router);

    try {
        if (authService.isAuthenticated()) {
            router.navigate(['/home']);
            return of(false);
        }
    } catch (error: unknown) {}

    return of(true);
};
