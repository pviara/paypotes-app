import { Filters } from '@core/model/filters/filters';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { Group, Groups } from '@core/model/group/group';
import { AddGroupDTO, GroupService } from '@core/services/group/group.service';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map, of } from 'rxjs';
import { QueryService } from '@core/services/query/query.service';
import { User, Users } from '@core/model/user/user';

export class GroupAPIService implements GroupService {
    private readonly endpoint = '/api/group';

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    addGroup(payload: AddGroupDTO): Observable<void> {
        throw new Error('Method not implemented.');
    }

    getGroup(id: string): Observable<Group> {
        return this.httpClientService.get<Group>(`${this.endpoint}/${id}`).pipe(
            map(
                () =>
                    new Group({
                        id,
                        name: 'Birthday',
                        emoji: '🎈',
                        members: Array.from({ length: 9 }),
                        balance: Math.ceil(
                            Math.random() * (9999 - -9999 + 1) + -9999,
                        ),
                    }),
            ),
        );
    }

    getGroups(pageIndex = 0, filters?: Filters): Observable<Groups> {
        const query = this.queryService.buildQueryFrom({ pageIndex, filters });

        return this.httpClientService
            .get<Groups>(`${this.endpoint}${query}`)
            .pipe(map(this.getDeterministicGroups()));
    }

    getMembersOf(groupId: string): Observable<User[]> {
        return this.httpClientService
            .get<Users>(`${this.endpoint}/members`)
            .pipe(
                map(() => [
                    new User({
                        id: generateRandomString(),
                        firstname: 'David',
                        lastname: 'Benzi',
                        avatarURL: 'ahmed.png',
                    }),
                    new User({
                        id: generateRandomString(),
                        firstname: 'Claire',
                        lastname: 'Laroche',
                        avatarURL: 'claire.png',
                    }),
                ]),
            );
    }

    private getDeterministicGroups(): () => Groups {
        return () => [
            new Group({
                id: generateRandomString(),
                name: 'BBQ',
                emoji: '🌭',
                members: Array.from({ length: 4 }),
                balance: 9845,
            }),
            new Group({
                id: generateRandomString(),
                name: 'Fiesta',
                emoji: '🍾',
                members: Array.from({ length: 18 }),
                balance: -1347,
            }),
            new Group({
                id: generateRandomString(),
                name: 'Birthday',
                emoji: '🎈',
                members: Array.from({ length: 9 }),
                balance: 3183,
            }),
            new Group({
                id: generateRandomString(),
                name: 'Bretagne',
                emoji: '🌊',
                members: Array.from({ length: 6 }),
                balance: -6980,
            }),
        ];
    }
}
