import { Filters } from '@core/model/filters/filters';
import {
    GroupsWithBalance,
    GroupWithBalance,
} from '@core/model/group/group-with-balance';
import { Groups } from '@core/model/group/group';
import { Observable } from 'rxjs';
import { User } from '@core/model/user/user';

export type AddGroupDTO = {
    name: string;
    emoji: string;
    memberIds: Array<string>;
};

export interface GroupService {
    addGroup(payload: AddGroupDTO): Observable<void>;
    getGroup(id: string): Observable<GroupWithBalance>;
    getGroups(): Observable<Groups>;
    getGroupsWithBalance(
        pageIndex?: number,
        filters?: Filters,
    ): Observable<GroupsWithBalance>;
    getMembersOf(groupId: string): Observable<User[]>;
    getLastFetchedGroup(): GroupWithBalance | null;
}
