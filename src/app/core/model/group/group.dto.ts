import { MemberDTOs } from '@core/model/group/member.dto';

export type GroupDTO = {
    readonly id: string;
    readonly name: string;
    readonly emoji: string;
    readonly members: MemberDTOs;
};

export type GroupDTOs = Array<GroupDTO>;
