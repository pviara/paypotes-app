import { AuthService } from '@core/services/auth/auth.service';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '@environments/environment';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '@core/model/user/user';
import { SignedInUser } from '@core/model/user/signed-in-user';

const SIGNED_IN_USER_STORAGE_KEY = 'signed_in_user';

export class AuthAPIService implements AuthService {
    private platformId = inject(PLATFORM_ID);
    private router = inject(Router);

    private readonly endpoint = `${environment.API_URL}/auth`;

    get actor(): User | null {
        const user = this.getUserFromStorage();
        return user
            ? new User({
                  id: user.data['id'],
                  firstname: user.data['firstname'],
                  lastname: user.data['lastname'],
                  avatarUrl: user.data['avatarUrl'],
              })
            : null;
    }

    set actor(value: User | null) {
        if (isPlatformBrowser(this.platformId)) {
            if (value) {
                localStorage.setItem(
                    SIGNED_IN_USER_STORAGE_KEY,
                    JSON.stringify({
                        token: this.token,
                        user: value,
                    }),
                );
            } else {
                localStorage.removeItem(SIGNED_IN_USER_STORAGE_KEY);
            }
        }
    }

    get token(): string | null {
        return this.getTokenFromStorage();
    }

    set token(value: string | null) {
        if (isPlatformBrowser(this.platformId)) {
            if (value) {
                localStorage.setItem(
                    SIGNED_IN_USER_STORAGE_KEY,
                    JSON.stringify({
                        token: value,
                        user: this.actor,
                    }),
                );
            } else {
                localStorage.removeItem(SIGNED_IN_USER_STORAGE_KEY);
            }
        }
    }

    constructor(private httpClientService: HttpClientService) {
        // todo: use this code in guard instead of auth service constructor
        if (this.token)
            this.getResponseFromGettingUserFrom(this.token).subscribe();
        else if (this.actor) {
            this.actor = null;
            this.router.navigate(['/'], { queryParamsHandling: 'preserve' });
        }
    }

    signInWith(idToken: string): Observable<User> {
        return this.httpClientService
            .post<SignedInUser>(this.endpoint, { idToken }, {})
            .pipe(
                switchMap(({ token }) => this.getUserFrom(token)),
                tap(() => this.router.navigate(['/home'])),
            );
    }

    getActorAvatarUrlOrDefault(): string {
        return this.actor?.getAvatarUrl() ?? '';
    }

    getActorIdOrDefault(): string {
        return this.actor?.getId() ?? '';
    }

    getUserFrom(token: string): Observable<User> {
        return this.httpClientService
            .get<User>(this.endpoint, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .pipe(
                tap(() => (this.token = token)),
                tap((user) => (this.actor = user)),
            );
    }

    isAuthenticated(): Observable<boolean> {
        return of(!!this.actor);
    }

    private getUserFromStorage(): { data: Record<string, string> } | null {
        if (isPlatformBrowser(this.platformId)) {
            const fromStorage = localStorage.getItem(
                SIGNED_IN_USER_STORAGE_KEY,
            );

            if (fromStorage) return JSON.parse(fromStorage)['user'];
        }
        return null;
    }

    private getTokenFromStorage(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            const fromStorage = localStorage.getItem(
                SIGNED_IN_USER_STORAGE_KEY,
            );

            if (fromStorage) return JSON.parse(fromStorage)['token'];
        }
        return null;
    }

    private getResponseFromGettingUserFrom(
        token: string,
    ): Observable<HttpResponse<unknown> | null> {
        return this.httpClientService
            .get<HttpResponse<unknown>>(this.endpoint, {
                headers: { Authorization: `Bearer ${token}` },
                observeResponse: true,
            })
            .pipe(
                catchError((response: HttpResponse<unknown>) => {
                    if (response.status === HttpStatusCode.Unauthorized) {
                        this.actor = null;
                        this.token = null;
                        this.router.navigate(['/'], {
                            queryParamsHandling: 'preserve',
                        });
                    }
                    return of(null);
                }),
            );
    }
}
