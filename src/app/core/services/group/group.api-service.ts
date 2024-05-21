import { delay, map, shareReplay } from 'rxjs';
import { Group, Groups } from '../../model/group/group';
import { GroupService } from './group.service';
import { HttpClientService } from '../http-client/http-client.service';

export class GroupAPIService implements GroupService {
    private readonly dummyGroupList: Groups = [
        new Group({
            id: 'A',
            name: 'Bretagne',
            members: Array.from({ length: 6 }),
        }),
        new Group({
            id: 'B',
            name: 'BBQ',
            members: Array.from({ length: 4 }),
        }),
        new Group({
            id: 'C',
            name: 'Fiesta',
            members: Array.from({ length: 18 }),
        }),
        new Group({
            id: 'D',
            name: 'Birthday',
            members: Array.from({ length: 9 }),
        }),
    ];

    groups = this.httpClientService
        .get<unknown>('api_url_to_group')
        .pipe(delay(3000), map(this.mapDummyGroupList()), shareReplay(1));

    constructor(private httpClientService: HttpClientService) {}

    mapDummyGroupList(): () => Array<Group> {
        return () => this.dummyGroupList;
    }
}
