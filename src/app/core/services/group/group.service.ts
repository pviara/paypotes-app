import { Filters } from '@core/model/expense/filters';
import { Groups } from '@core/model/group/group';
import { Observable } from 'rxjs';

export interface GroupService {
    getGroups(pageIndex?: number, filters?: Filters): Observable<Groups>;
}
