import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';

export const notAuthenticatedGuard: CanActivateFn = (): Observable<boolean> => {
    const authService = inject(AuthServiceToken);
    const router = inject(Router);

    return authService.isAuthenticated().pipe(
        map((isAuthenticated) => !isAuthenticated),
        map((isNotAuthenticated) => {
            if (isNotAuthenticated) return true;
            router.navigate(['/home']);
            return false;
        }),
    );
};
