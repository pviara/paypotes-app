import { Observable, shareReplay } from 'rxjs';
import { GroupService } from './group.service';
import { Groups } from '../../model/group';
import { HttpClientService } from '../http-client/http-client.service';

export class GroupAPIService implements GroupService {
    groups: Observable<Groups> = this.httpClientService
        .get<Groups>('')
        .pipe(shareReplay(1));

    constructor(private httpClientService: HttpClientService) {}
}
