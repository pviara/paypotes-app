import { Filters } from '@core/model/expense/filters';
import { Group, Groups } from '@core/model/group/group';
import { GroupService } from '@core/services/group/group.service';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map } from 'rxjs';

export class GroupAPIService implements GroupService {
    private readonly endpoint = 'api_url_to_group';

    constructor(private httpClientService: HttpClientService) {}

    getGroups(pageIndex = 0, filters?: Filters): Observable<Groups> {
        const url = this.buildURLWith(pageIndex, filters);

        return this.httpClientService
            .get<Groups>(url)
            .pipe(map(this.getDeterministicGroups()));
    }

    private buildURLWith(pageIndex: number, filters?: Filters): string {
        const query: Record<string, string | undefined> = {
            pageIndex: pageIndex.toString(),
            search: filters?.search,
            type: filters?.type,
        };

        const isQueryEmpty = Object.values(query).every((value) => !value);
        if (isQueryEmpty) {
            return this.endpoint;
        }

        let url = `${this.endpoint}?`;

        Object.keys(query).forEach((key) => {
            const value = query[key];

            if (value) {
                const prefix = url.endsWith('?') ? '' : '&';
                url += `${prefix}${key}=${value}`;
            }
        });

        return url;
    }

    private getDeterministicGroups(): () => Groups {
        return () => [
            new Group({
                id: 'B',
                name: 'BBQ',
                emoji: '🌭',
                members: Array.from({ length: 4 }),
                balance: 9845,
            }),
            new Group({
                id: 'C',
                name: 'Fiesta',
                emoji: '🍾',
                members: Array.from({ length: 18 }),
                balance: -1347,
            }),
            new Group({
                id: 'D',
                name: 'Birthday',
                emoji: '🎈',
                members: Array.from({ length: 9 }),
                balance: 3183,
            }),
            new Group({
                id: 'A',
                name: 'Bretagne',
                emoji: '🌊',
                members: Array.from({ length: 6 }),
                balance: -6980,
            }),
        ];
    }
}
