import { Observable } from 'rxjs';
import { Users } from '@core/model/user/user';

export interface UserService {
    getUserByName(name: string): Observable<Users>;
}
