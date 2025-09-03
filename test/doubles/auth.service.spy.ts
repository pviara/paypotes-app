import { AuthService } from '@core/services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { Spy } from '@test/model/spy';
import { User } from '@core/model/user/user';

export class AuthServiceSpy extends Spy<AuthService> implements AuthService {
    private DEFAULT_USER = new User({
        id: '',
        firstname: '',
        lastname: '',
        avatarUrl: '',
    });

    override readonly calls = {
        actor: {
            count: 0,
            history: [],
        },
        getActorAvatarUrlOrDefault: {
            count: 0,
            history: [],
        },
        getActorIdOrDefault: {
            count: 0,
            history: [],
        },
        getUserFrom: {
            count: 0,
            history: [] as Array<string>,
        },
        isAuthenticated: {
            count: 0,
            history: [],
        },
        token: {
            count: 0,
            history: [],
        },
        signInWith: {
            count: 0,
            history: [],
        },
    };

    get actor(): User | null {
        this.saveCall('actor', undefined);
        return this.getStubOrDefault('actor', null) as User | null;
    }

    get token(): string | null {
        this.saveCall('token', undefined);
        return this.getStubOrDefault('token', null) as string | null;
    }

    getActorAvatarUrlOrDefault(): string {
        this.saveCall('getActorAvatarUrlOrDefault', undefined);
        return this.getStubOrDefault('getActorAvatarUrlOrDefault', '');
    }

    getActorIdOrDefault(): string {
        this.saveCall('getActorIdOrDefault', undefined);
        return this.getStubOrDefault('getActorIdOrDefault', '');
    }

    getUserFrom(token: string): Observable<User> {
        this.saveCall('getUserFrom', token);
        return this.getStubOrDefault('getUserFrom', of(this.DEFAULT_USER));
    }

    isAuthenticated(): Observable<boolean> {
        return of(false);
    }

    signInWith(idToken: string): Observable<User> {
        return of();
    }
}
