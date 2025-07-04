import { AddGroupDTO, GroupService } from '@core/services/group/group.service';
import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filters } from '@core/model/filters/filters';
import { GroupMetadata, Groups, Group } from '@core/model/group/group';
import { GroupDTO, GroupDTOs } from '@core/model/group/group.dto';
import {
    GroupWithBalanceDTO,
    GroupWithBalanceDTOs,
} from '@core/model/group/group-with-balance.dto';
import {
    GroupsWithBalance,
    GroupWithBalance,
} from '@core/model/group/group-with-balance';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { inject } from '@angular/core';
import { MemberDTO } from '@core/model/group/member.dto';
import { Members, Member } from '@core/model/group/member';
import { QueryService } from '@core/services/query/query.service';
import { v4 } from 'uuid';

export class GroupAPIService implements GroupService {
    private authService = inject(AuthServiceToken);

    private readonly endpoint = `${environment.API_URL}/groups`;

    lastFetchedGroup = new BehaviorSubject<GroupWithBalance | null>(null);

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    createGroup(payload: AddGroupDTO): Observable<void> {
        return this.httpClientService.post(
            this.endpoint,
            {
                ...payload,
                id: v4(),
            },
            {
                headers: { Authorization: `Bearer ${this.authService.token}` },
            },
        );
    }

    getGroup(id: string): Observable<GroupWithBalance> {
        return this.httpClientService
            .get<GroupWithBalanceDTO>(`${this.endpoint}/${id}`, {
                headers: { Authorization: `Bearer ${this.authService.token}` },
            })
            .pipe(
                map((group) => this.mapGroupWithBalanceFrom(group)),
                tap((group) => this.lastFetchedGroup.next(group)),
            );
    }

    getGroups(): Observable<Groups> {
        return this.httpClientService
            .get<GroupDTOs>(`${this.endpoint}/without-balance`, {
                headers: { Authorization: `Bearer ${this.authService.token}` },
            })
            .pipe(map((groups) => this.mapGroupsFrom(groups)));
    }

    getGroupsWithBalance(
        pageIndex = 0,
        filters?: Filters,
    ): Observable<GroupsWithBalance> {
        const query = this.queryService.buildQueryFrom({ pageIndex, filters });

        return this.httpClientService
            .get<GroupWithBalanceDTOs>(`${this.endpoint}${query}`, {
                headers: { Authorization: `Bearer ${this.authService.token}` },
            })
            .pipe(map((groups) => this.mapGroupsWithBalance(groups)));
    }

    getLastFetchedGroup(): GroupWithBalance | null {
        return this.lastFetchedGroup.getValue();
    }

    private mapGroupsFrom(groups: GroupDTOs): Groups {
        return groups.map((group) => this.mapGroupFrom(group));
    }

    private mapGroupsWithBalance(
        groups: GroupWithBalanceDTOs,
    ): GroupsWithBalance {
        return groups.map((group) => this.mapGroupWithBalanceFrom(group));
    }

    private mapGroupFrom(group: GroupDTO): Group {
        const metadata: GroupMetadata = {
            id: group.id,
            name: group.name,
            emoji: group.emoji,
        };
        const members = this.mapMembersFrom(group);
        return new Group({ metadata, members });
    }

    private mapGroupWithBalanceFrom(
        group: GroupWithBalanceDTO,
    ): GroupWithBalance {
        const metadata: GroupMetadata = {
            id: group.id,
            name: group.name,
            emoji: group.emoji,
        };
        const members = this.mapMembersFrom(group);
        return new GroupWithBalance({ metadata, members }, group.balance);
    }

    private mapMembersFrom(group: GroupDTO): Members {
        return group.members.map((member) => this.mapMemberFrom(member));
    }

    private mapMemberFrom(member: MemberDTO): Member {
        return new Member({
            id: member.id,
            firstname: member.firstname,
            lastname: member.lastname,
            avatarUrl: member.avatarUrl,
        });
    }
}
