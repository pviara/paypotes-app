import { Filters } from '@core/model/filters/filters';
import {
    GroupsWithBalance,
    GroupWithBalance,
} from '@core/model/group/group-with-balance';
import { Groups } from '@core/model/group/group';
import { Observable } from 'rxjs';

export type AddGroupDTO = {
    name: string;
    emoji: string;
    userIds: Array<string>;
};

export interface GroupService {
    createGroup(payload: AddGroupDTO): Observable<void>;
    getGroup(id: string): Observable<GroupWithBalance>;
    getGroups(): Observable<Groups>;
    getGroupsWithBalance(
        pageIndex?: number,
        filters?: Filters,
    ): Observable<GroupsWithBalance>;
    getLastFetchedGroup(): GroupWithBalance | null;
}
