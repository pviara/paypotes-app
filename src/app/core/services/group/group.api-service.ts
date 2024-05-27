import { Group, Groups } from '@core/model/group/group';
import { GroupService } from '@core/services/group/group.service';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { map, shareReplay } from 'rxjs';

export class GroupAPIService implements GroupService {
    private readonly dummyGroupList: Groups = [
        new Group({
            id: 'B',
            name: 'BBQ',
            emoji: '🌭',
            members: Array.from({ length: 4 }),
        }),
        new Group({
            id: 'C',
            name: 'Fiesta',
            emoji: '🍾',
            members: Array.from({ length: 18 }),
        }),
        new Group({
            id: 'D',
            name: 'Birthday',
            emoji: '🎈',
            members: Array.from({ length: 9 }),
        }),
        new Group({
            id: 'A',
            name: 'Bretagne',
            emoji: '🌊',
            members: Array.from({ length: 6 }),
        }),
    ];

    groups = this.httpClientService
        .get<unknown>('api_url_to_group')
        .pipe(map(this.mapDummyGroupList()), shareReplay(1));

    constructor(private httpClientService: HttpClientService) {}

    mapDummyGroupList(): () => Array<Group> {
        return () => this.dummyGroupList;
    }
}
