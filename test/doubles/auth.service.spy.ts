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
        token: {
            count: 0,
            history: [],
        },
        getUserFromToken: {
            count: 0,
            history: [] as Array<string>,
        },
    };

    get actor(): User {
        this.saveCall('actor', null);
        return this.DEFAULT_USER;
    }

    get token(): string {
        this.saveCall('token', null);
        return '';
    }

    getUserFromToken(token: string): Observable<User> {
        this.saveCall('getUserFromToken', token);
        return of(this.DEFAULT_USER);
    }
}
