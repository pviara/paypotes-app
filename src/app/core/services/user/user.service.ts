import { Observable } from 'rxjs';
import { User } from '@core/model/user/user';

export interface UserService {
    getUser(phoneNumber: string): Observable<User>;
}
