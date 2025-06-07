import { Filters } from '@core/model/filters/filters';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { Group, Groups } from '@core/model/group/group';
import { AddGroupDTO, GroupService } from '@core/services/group/group.service';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { QueryService } from '@core/services/query/query.service';
import { User, Users } from '@core/model/user/user';
import { getRandomEmoji } from '@shared/utils/get-random-emoji';
import { GroupMetadata, GroupsV2, GroupV2 } from '@core/model/group/v2/group';
import { GroupDTO, GroupDTOs } from '@core/model/group/v2/group.dto';
import { MembersV2, MemberV2 } from '@core/model/group/v2/member';
import { MemberDTO, MemberDTOs } from '@core/model/group/v2/member.dto';
import { generateRandomSmallNumber } from '@shared/utils/generate-random-number';
import {
    GroupWithBalanceDTO,
    GroupWithBalanceDTOs,
} from '@core/model/group/v2/group-with-balance.dto';
import {
    GroupsWithBalanceV2,
    GroupWithBalanceV2,
} from '@core/model/group/v2/group-with-balance';

export class GroupAPIService implements GroupService {
    private readonly endpoint = '/api/group';

    lastFetchedGroup = new BehaviorSubject<Group | null>(null);

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    addGroup(payload: AddGroupDTO): Observable<void> {
        return this.httpClientService.post(this.endpoint, payload);
    }

    getGroup(id: string): Observable<Group> {
        const deterministicGroup = new Group({
            id,
            name: 'Birthday',
            emoji: getRandomEmoji(),
            members: Array.from({ length: 9 }),
            balance: Math.ceil(Math.random() * (9999 - -9999 + 1) + -9999),
        });
        return this.httpClientService.get<Group>(`${this.endpoint}/${id}`).pipe(
            map(() => deterministicGroup),
            tap(() => this.lastFetchedGroup.next(deterministicGroup)),
        );
    }

    getGroups(): Observable<GroupsV2> {
        return this.httpClientService.get(this.endpoint).pipe(
            map(() => this.getDeterministicGroupDTOs()),
            map((groups) => this.mapGroupsV2From(groups)),
        );
    }

    getGroupsWithBalance(
        pageIndex = 0,
        filters?: Filters,
    ): Observable<GroupsWithBalanceV2> {
        const query = this.queryService.buildQueryFrom({ pageIndex, filters });

        return this.httpClientService.get(`${this.endpoint}${query}`).pipe(
            map(() => this.getDeterministicGroupWithBalanceDTOs()),
            map((groups) => this.mapGroupsWithBalanceV2(groups)),
        );
    }

    getLastFetchedGroup(): Group | null {
        return this.lastFetchedGroup.getValue();
    }

    getMembersOf(groupId: string): Observable<User[]> {
        return this.httpClientService
            .get<Users>(`${this.endpoint}/${groupId}/members`)
            .pipe(
                map(() => [
                    new User({
                        id: generateRandomString(),
                        firstname: 'David',
                        lastname: 'Benzi',
                        avatarURL: 'ahmed.png',
                    }),
                    new User({
                        id: generateRandomString(),
                        firstname: 'Claire',
                        lastname: 'Laroche',
                        avatarURL: 'claire.png',
                    }),
                ]),
            );
    }

    private getNoGroup(): () => Groups {
        return () => [];
    }

    private getDeterministicGroupWithBalanceDTOs(): GroupWithBalanceDTOs {
        return [
            {
                id: generateRandomString(),
                name: 'BBQ',
                emoji: '🌭',
                members: this.getRandomMemberDTOs(),
                balance: '-12,75',
            },
            {
                id: generateRandomString(),
                name: 'Fiesta',
                emoji: '🍾',
                members: this.getRandomMemberDTOs(),
                balance: '18,50',
            },
            {
                id: generateRandomString(),
                name: 'Birthday',
                emoji: '🎈',
                members: this.getRandomMemberDTOs(),
                balance: '2,80',
            },
            {
                id: generateRandomString(),
                name: 'Bretagne',
                emoji: '🌊',
                members: this.getRandomMemberDTOs(),
                balance: '-58,00',
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
        return Array.from({ length: generateRandomSmallNumber() }, () => ({
            id: generateRandomString(),
            firstname: 'Firstname',
            lastname: 'Lastname',
        }));
    }

    private getDeterministicGroups(): () => Groups {
        return () => [
            new Group({
                id: generateRandomString(),
                name: 'BBQ',
                emoji: '🌭',
                members: Array.from({ length: 4 }),
                balance: 9845,
            }),
            new Group({
                id: generateRandomString(),
                name: 'Fiesta',
                emoji: '🍾',
                members: Array.from({ length: 18 }),
                balance: -1347,
            }),
            new Group({
                id: generateRandomString(),
                name: 'Birthday',
                emoji: '🎈',
                members: Array.from({ length: 9 }),
                balance: 3183,
            }),
            new Group({
                id: generateRandomString(),
                name: 'Bretagne',
                emoji: '🌊',
                members: Array.from({ length: 6 }),
                balance: -6980,
            }),
        ];
    }

    private mapGroupsV2From(groups: GroupDTOs): GroupsV2 {
        return groups.map((group) => this.mapGroupV2From(group));
    }

    private mapGroupsWithBalanceV2(
        groups: GroupWithBalanceDTOs,
    ): GroupsWithBalanceV2 {
        return groups.map((group) => this.mapGroupWithBalanceV2From(group));
    }

    private mapGroupV2From(group: GroupDTO): GroupV2 {
        const metadata: GroupMetadata = {
            id: group.id,
            name: group.name,
            emoji: group.emoji,
        };
        const members = this.mapMembersFrom(group);
        return new GroupV2({ metadata, members });
    }

    private mapGroupWithBalanceV2From(
        group: GroupWithBalanceDTO,
    ): GroupWithBalanceV2 {
        const metadata: GroupMetadata = {
            id: group.id,
            name: group.name,
            emoji: group.emoji,
        };
        const members = this.mapMembersFrom(group);
        return new GroupWithBalanceV2({ metadata, members }, group.balance);
    }

    private mapMembersFrom(group: GroupDTO): MembersV2 {
        return group.members.map((member) => this.mapMemberV2From(member));
    }

    private mapMemberV2From(member: MemberDTO): MemberV2 {
        return new MemberV2({
            id: member.id,
            firstname: member.firstname,
            lastname: member.lastname,
        });
    }
}
