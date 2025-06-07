import { MemberDTO } from "@core/model/group/v2/member.dto";

export type GroupDTO = {
    readonly id: string,
    readonly name: string,
    readonly emoji: string,
    readonly members: Array<MemberDTO>,
}