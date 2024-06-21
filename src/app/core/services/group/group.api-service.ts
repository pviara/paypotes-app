import { Filters } from '@core/model/expense/filters';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { Group, Groups } from '@core/model/group/group';
import { GroupService } from '@core/services/group/group.service';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map } from 'rxjs';

export class GroupAPIService implements GroupService {
    private readonly endpoint = '/api/group';

    constructor(private httpClientService: HttpClientService) {}

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
        const url = this.buildURLWith({ pageIndex, filters });

        return this.httpClientService
            .get<Groups>(url)
            .pipe(map(this.getDeterministicGroups()));
    }

    private buildURLWith(query: Record<string, any>): string {
        const isQueryEmpty = Object.values(query).every((value) => !value);
        if (isQueryEmpty) {
            return this.endpoint;
        }

        const url = `${this.endpoint}?`;
        return this.appendElementsFrom(query, url);
    }

    private appendElementsFrom(query: Record<string, any>, url = ''): string {
        for (const key of Object.keys(query)) {
            const value = query[key];

            if (value) {
                if (typeof value === 'object') {
                    url += this.appendElementsFrom(value);
                    continue;
                }

                const prefix = url.endsWith('?') ? '' : '&';
                url += `${prefix}${key}=${value}`;
            }
        }
        return url;
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
