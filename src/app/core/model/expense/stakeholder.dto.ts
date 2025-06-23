export type StakeholderDTO = {
    readonly id: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly avatarUrl: string;
    readonly share: string;
};

export type StakeholderDTOs = Array<StakeholderDTO>;
