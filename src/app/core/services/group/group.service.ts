import { Filters } from '@core/model/expense/filters';
import { Group, Groups } from '@core/model/group/group';
import { Observable } from 'rxjs';

export interface GroupService {
    getGroup(id: string): Observable<Group>;
    getGroups(pageIndex?: number, filters?: Filters): Observable<Groups>;
}
