import { Observable } from 'rxjs';
import { User } from '@core/model/user/user';

export interface UserService {
    getUserByName(name: string): Observable<User[]>;
    getUserByPhone(phoneNumber: string): Observable<User>;
}
