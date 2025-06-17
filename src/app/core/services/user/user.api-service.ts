import { HttpClientService } from '@core/services/http-client/http-client.service';
import { map, Observable } from 'rxjs';
import { UserService } from '@core/services/user/user.service';
import { environment } from 'src/environments/environment';
import { User, Users } from '@core/model/user/user';
import { UserDTO, UserDTOs } from '@core/model/user/user.dto';
import { QueryService } from '../query/query.service';

export class UserAPIService implements UserService {
    private readonly endpoint = `${environment.API_URL}/users`;

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    getUserByName(name: string): Observable<Users> {
        const query = this.queryService.buildQueryFrom({ name });
        return this.httpClientService
            .get<UserDTOs>(`${this.endpoint}${query}`)
            .pipe(map((dtos) => this.mapUsersFrom(dtos)));
    }

    private mapUsersFrom(dtos: UserDTOs): Users {
        return dtos.map((dto) => this.mapUserFrom(dto));
    }

    private mapUserFrom(dto: UserDTO): User {
        return new User({
            id: dto.id,
            firstname: dto.firstname,
            lastname: dto.lastname,
            avatarUrl: dto.avatarUrl,
        });
    }
}
