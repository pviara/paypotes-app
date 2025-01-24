import { SignedInUser } from '@core/model/user/signed-in-user';
import { AuthService } from './auth.service';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { User } from '@core/model/user/user';

export class AuthAPIService implements AuthService {
    get signedInUser(): SignedInUser | null {
        return {
            token: generateRandomString(30),
            user: new User({
                avatarURL: 'avatar.png',
                firstname: 'Pierre',
                lastname: 'Viara',
                id: generateRandomString(),
            }),
        };
    }

    set signedInUser(value: SignedInUser | null) {
        throw new Error('Method not implemented.');
    }
}
