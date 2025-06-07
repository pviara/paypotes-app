import { Filters } from '@core/model/filters/filters';
import { Group } from '@core/model/group/group';
import { GroupsWithBalanceV2 } from '@core/model/group/v2/group-with-balance';
import { GroupsV2 } from '@core/model/group/v2/group';
import { Observable } from 'rxjs';
import { User } from '@core/model/user/user';

export type AddGroupDTO = {
    name: string;
    emoji: string;
    memberIds: Array<string>;
};

export interface GroupService {
    addGroup(payload: AddGroupDTO): Observable<void>;
    getGroup(id: string): Observable<Group>;
    getGroups(): Observable<GroupsV2>;
    getGroupsWithBalance(
        pageIndex?: number,
        filters?: Filters,
    ): Observable<GroupsWithBalanceV2>;
    getMembersOf(groupId: string): Observable<User[]>;
    getLastFetchedGroup(): Group | null;
}
