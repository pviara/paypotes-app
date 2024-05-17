import { Observable, map, of, shareReplay } from 'rxjs';
import { Group, Groups } from '../../model/group';
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
    ];

    groups: Observable<Groups> = this.httpClientService
        .get<unknown>('api_url_to_group')
        .pipe(
            map(() => this.dummyGroupList),
            shareReplay(1),
        );

    constructor(private httpClientService: HttpClientService) {}
}
