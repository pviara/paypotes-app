import { User } from '@core/model/user/user';

export type SignedInUser = {
    token: string;
    user: User;
};
