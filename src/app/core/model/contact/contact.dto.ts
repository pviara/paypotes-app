export type ContactDTO = {
    readonly id: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly avatarUrl: string;
};

export type ContactDTOs = Array<ContactDTO>;
