import { AuthService } from './auth.service';
import { User } from '@core/model/user/user';

export class AuthAPIService implements AuthService {
    getActor(): User {
        return new User({
            id: 'b714106e-7691-49f9-94c9-86eaea845642',
            firstname: 'Clark',
            lastname: 'Kent',
            avatarUrl:
                'https://gravatar.com/avatar/6d47aeeb1c5ea9a4f9f7ea7ecc36a721?s=800&d=mp&r=x',
        });
    }
}
