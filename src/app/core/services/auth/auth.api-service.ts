import { SignedInUser } from '@core/model/user/signed-in-user';
import { AuthService } from './auth.service';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { User } from '@core/model/user/user';

export class AuthAPIService implements AuthService {
    get signedInUser(): SignedInUser | null {
        return {
            token: generateRandomString(30),
            user: new User({
                id: 'b714106e-7691-49f9-94c9-86eaea845642',
                firstname: 'Pierre',
                lastname: 'Viara',
                avatarUrl:
                    'https://gravatar.com/avatar/6d47aeeb1c5ea9a4f9f7ea7ecc36a721?s=800&d=mp&r=x',
            }),
        };
    }

    set signedInUser(value: SignedInUser | null) {
        throw new Error('Method not implemented.');
    }
}
