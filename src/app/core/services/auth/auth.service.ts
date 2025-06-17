import { User } from '@core/model/user/user';

export interface AuthService {
    getSignedInUser(): User;
}
