import { SignedInUser } from '@core/model/user/signed-in-user';

export interface AuthService {
    get signedInUser(): SignedInUser | null;
    set signedInUser(value: SignedInUser | null);
}
