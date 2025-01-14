import { Filters } from '@core/model/filters/filters';
import { Group, Groups } from '@core/model/group/group';
import { User } from '@core/model/user/user';
import { Observable } from 'rxjs';

export type AddGroupDTO = {
    name: string;
    emoji: string;
    memberIds: Array<string>;
};

export interface GroupService {
    addGroup(payload: AddGroupDTO): Observable<void>;
    getGroup(id: string): Observable<Group>;
    getGroups(pageIndex?: number, filters?: Filters): Observable<Groups>;
    getMembersOf(groupId: string): Observable<User[]>;
}
