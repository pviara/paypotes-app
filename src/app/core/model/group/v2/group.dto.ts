import { MemberDTOs } from '@core/model/group/v2/member.dto';

export type GroupDTO = {
    readonly id: string;
    readonly name: string;
    readonly emoji: string;
    readonly members: MemberDTOs;
};

export type GroupDTOs = Array<GroupDTO>;
