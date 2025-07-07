import { Observable } from 'rxjs';
import { User } from '@core/model/user/user';

export interface AuthService {
    get actor(): User;
    get token(): string;
    getUserFromToken(token: string): Observable<User>;
    isAuthenticated(): boolean;
}
