export type MemberDTO = {
    readonly id: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly avatarUrl: string;
};

export type MemberDTOs = Array<MemberDTO>;
