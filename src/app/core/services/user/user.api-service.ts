import { generateRandomString } from '@shared/utils/generate-random-string';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { map, Observable } from 'rxjs';
import { QueryService } from '@core/services/query/query.service';
import { User } from '@core/model/user/user';
import { UserService } from '@core/services/user/user.service';

export class UserAPIService implements UserService {
    private readonly endpoint = '/api/user';

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    getUserByName(name: string): Observable<User[]> {
        const query = this.queryService.buildQueryFrom({ name });
        return this.httpClientService
            .get<User[]>(`${this.endpoint}${query}`)
            .pipe(
                map((_) => [
                    new User({
                        id: generateRandomString(),
                        firstname: 'William',
                        lastname: 'Duvellois',
                        avatarURL: 'ahmed.png',
                    }),
                    new User({
                        id: generateRandomString(),
                        firstname: 'William',
                        lastname: 'Zendayo',
                        avatarURL: 'valentin.png',
                    }),
                ]),
            );
    }

    getUserByPhone(phoneNumber: string): Observable<User> {
        const query = this.queryService.buildQueryFrom({ phoneNumber });
        return this.httpClientService
            .get<User>(`${this.endpoint}${query}`)
            .pipe(
                map(
                    (_) =>
                        new User({
                            id: generateRandomString(),
                            firstname: 'David',
                            lastname: 'Benzi',
                            avatarURL: 'ahmed.png',
                        }),
                ),
            );
    }
}
