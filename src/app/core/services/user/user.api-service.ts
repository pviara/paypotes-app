import { generateRandomString } from '@shared/utils/generate-random-string';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { map, Observable } from 'rxjs';
import { QueryService } from '@core/services/query/query.service';
import { User } from '@core/model/user/user';
import { UserService } from '@core/services/user/user.service';
import { environment } from 'src/environments/environment';

export class UserAPIService implements UserService {
    private readonly endpoint = `${environment.API_URL}/users`;

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    getUserByName(name: string): Observable<User[]> {
        const query = this.queryService.buildQueryFrom({ name });
        return this.httpClientService.get<User[]>(`${this.endpoint}${query}`);
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
