import { AddGroupDTO, GroupService } from '@core/services/group/group.service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Filters } from '@core/model/filters/filters';
import { generateRandomSmallNumber } from '@shared/utils/generate-random-number';
import { generateRandomString } from '@shared/utils/generate-random-string';
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
import { MemberDTO, MemberDTOs } from '@core/model/group/member.dto';
import { Members, Member } from '@core/model/group/member';
import { QueryService } from '@core/services/query/query.service';
import { generateRandomBalance } from '@shared/utils/generate-random-balance';

export class GroupAPIService implements GroupService {
    private readonly endpoint = '/api/group';

    lastFetchedGroup = new BehaviorSubject<GroupWithBalance | null>(null);

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    addGroup(payload: AddGroupDTO): Observable<void> {
        return this.httpClientService.post(this.endpoint, payload);
    }

    getGroup(id: string): Observable<GroupWithBalance> {
        return this.httpClientService.get(`${this.endpoint}/${id}`).pipe(
            map(() => this.getDeterministicGroupWithBalanceDTOs()[0]),
            map((group) => this.mapGroupWithBalanceFrom(group)),
            tap((group) => this.lastFetchedGroup.next(group)),
        );
    }

    getGroups(): Observable<Groups> {
        return this.httpClientService
            .get(`${this.endpoint}/without-balance`)
            .pipe(
                map(() => this.getDeterministicGroupDTOs()),
                map((groups) => this.mapGroupsFrom(groups)),
            );
    }

    getGroupsWithBalance(
        pageIndex = 0,
        filters?: Filters,
    ): Observable<GroupsWithBalance> {
        const query = this.queryService.buildQueryFrom({ pageIndex, filters });

        return this.httpClientService.get(`${this.endpoint}${query}`).pipe(
            map(() => this.getDeterministicGroupWithBalanceDTOs()),
            map((groups) => this.mapGroupsWithBalance(groups)),
        );
    }

    getLastFetchedGroup(): GroupWithBalance | null {
        return this.lastFetchedGroup.getValue();
    }

    private getDeterministicGroupWithBalanceDTOs(): GroupWithBalanceDTOs {
        return [
            {
                id: generateRandomString(),
                name: 'BBQ',
                emoji: '🌭',
                members: this.getRandomMemberDTOs(),
                balance: generateRandomBalance(),
            },
            {
                id: generateRandomString(),
                name: 'Fiesta',
                emoji: '🍾',
                members: this.getRandomMemberDTOs(),
                balance: generateRandomBalance(),
            },
            {
                id: generateRandomString(),
                name: 'Birthday',
                emoji: '🎈',
                members: this.getRandomMemberDTOs(),
                balance: generateRandomBalance(),
            },
            {
                id: generateRandomString(),
                name: 'Bretagne',
                emoji: '🌊',
                members: this.getRandomMemberDTOs(),
                balance: generateRandomBalance(),
            },
        ];
    }

    private getDeterministicGroupDTOs(): GroupDTOs {
        return [
            {
                id: generateRandomString(),
                name: 'BBQ',
                emoji: '🌭',
                members: this.getRandomMemberDTOs(),
            },
            {
                id: generateRandomString(),
                name: 'Fiesta',
                emoji: '🍾',
                members: this.getRandomMemberDTOs(),
            },
            {
                id: generateRandomString(),
                name: 'Birthday',
                emoji: '🎈',
                members: this.getRandomMemberDTOs(),
            },
            {
                id: generateRandomString(),
                name: 'Bretagne',
                emoji: '🌊',
                members: this.getRandomMemberDTOs(),
            },
        ];
    }

    private getRandomMemberDTOs(): MemberDTOs {
        return Array.from({ length: generateRandomSmallNumber() }, () => {
            const { firstname, lastname } = this.generateRandomName();
            return {
                id: generateRandomString(),
                firstname,
                lastname,
                avatarUrl: this.getRandomAvatarUrl(),
            };
        });
    }

    private getRandomAvatarUrl(): string {
        const avatars = [
            'ahmed.png',
            'claire.png',
            'claire.png',
            'estelle.png',
            'valentin.png',
        ];
        return avatars[Math.floor(Math.random() * avatars.length)];
    }

    private generateRandomName(): { firstname: string; lastname: string } {
        const firstnames = [
            'Alice',
            'Bob',
            'Charlie',
            'David',
            'Emma',
            'Fiona',
            'George',
            'Hannah',
        ];
        const lastnames = [
            'Smith',
            'Johnson',
            'Williams',
            'Brown',
            'Jones',
            'Garcia',
            'Miller',
            'Davis',
        ];

        const firstname =
            firstnames[Math.floor(Math.random() * firstnames.length)];
        const lastname =
            lastnames[Math.floor(Math.random() * lastnames.length)];

        return { firstname, lastname };
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
