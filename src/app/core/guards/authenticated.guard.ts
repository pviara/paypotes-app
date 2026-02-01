import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable, of } from 'rxjs';

export const authenticatedGuard: CanActivateFn = (): Observable<boolean> => {
    const authService = inject(AuthServiceToken);
    const router = inject(Router);

    return authService.isAuthenticated().pipe(
        map((isAuthenticated) => {
            if (isAuthenticated) return true;
            router.navigate(['/'], { queryParamsHandling: 'preserve' });
            return false;
        }),
    );
};
