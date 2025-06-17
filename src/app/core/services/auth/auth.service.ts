import { SignedInUser } from '@core/model/user/signed-in-user';
import { User } from '@core/model/user/user';

export interface AuthService {
    getSignedInUser(): User;
}
