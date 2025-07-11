import { Observable } from 'rxjs';
import { User } from '@core/model/user/user';

export interface AuthService {
    get actor(): User | null;
    get token(): string | null;
    getActorAvatarUrlOrDefault(): string;
    getActorIdOrDefault(): string;
    getUserFrom(token: string): Observable<User>;
    isAuthenticated(): Observable<boolean>;
}
