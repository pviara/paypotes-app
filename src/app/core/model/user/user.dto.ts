export type UserDTO = {
    readonly id: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly avatarUrl: string;
};

export type UserDTOs = Array<UserDTO>;
