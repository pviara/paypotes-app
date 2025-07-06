import { AuthService } from '@core/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { FAKE_USER } from '@core/model/user/fake-user';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { User } from '@core/model/user/user';

const SIGNED_IN_USER_STORAGE_KEY = 'signed_in_user';

export class AuthAPIService implements AuthService {
    private platformId = inject(PLATFORM_ID);

    private readonly endpoint = `${environment.API_URL}/auth`;
    private notPlatformBrowserError = new Error(
        'Current platform is not browser and thus signed in user cannot be retrieved',
    );

    get actor(): User {
        const actor = this.getUserFromStorage();
        return new User({
            id: actor.data['id'],
            firstname: actor.data['firstname'],
            lastname: actor.data['lastname'],
            avatarUrl: actor.data['avatarUrl'],
        });
    }

    set actor(value: User) {
        if (isPlatformBrowser(this.platformId) && value) {
            localStorage.setItem(
                SIGNED_IN_USER_STORAGE_KEY,
                JSON.stringify({
                    token: this.token,
                    user: value,
                }),
            );
        }
    }

    get token(): string {
        return this.getTokenFromStorage();
    }

    set token(value: string) {
        if (isPlatformBrowser(this.platformId) && value) {
            localStorage.setItem(
                SIGNED_IN_USER_STORAGE_KEY,
                JSON.stringify({
                    token: value,
                    user: this.actor,
                }),
            );
        }
    }

    constructor(private httpClientService: HttpClientService) {}

    getUserFromToken(token: string): Observable<User> {
        return this.httpClientService
            .get<User>(this.endpoint, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .pipe(
                tap(() => (this.token = token)),
                tap((user) => (this.actor = user)),
            );
    }

    private getUserFromStorage(): { data: Record<string, string> } {
        if (isPlatformBrowser(this.platformId)) {
            const fromStorage = localStorage.getItem(
                SIGNED_IN_USER_STORAGE_KEY,
            );

            if (fromStorage) return JSON.parse(fromStorage)['user'];
            return FAKE_USER;
        }
        throw this.notPlatformBrowserError;
    }

    private getTokenFromStorage(): string {
        if (isPlatformBrowser(this.platformId)) {
            const fromStorage = localStorage.getItem(
                SIGNED_IN_USER_STORAGE_KEY,
            );

            if (fromStorage) return JSON.parse(fromStorage)['token'];
            return '';
        }
        throw this.notPlatformBrowserError;
    }
}
