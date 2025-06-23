export type StakeholderMetadata = {
    id: string;
    firstname: string;
    lastname: string;
    avatarUrl: string;
};

export class Stakeholder {
    constructor(
        private metadata: StakeholderMetadata,
        private share: string,
    ) {}

    getAvatarUrl(): string {
        return this.metadata.avatarUrl;
    }

    getFirstname(): string {
        return this.metadata.firstname;
    }

    getFullName(): string {
        return `${this.getFirstname()} ${this.getLastname()}`;
    }

    getId(): string {
        return this.metadata.id;
    }

    getLastname(): string {
        return this.metadata.lastname;
    }

    isActive(): boolean {
        return +this.share.replace(',', '.') > 0;
    }
}

export type Stakeholders = Array<Stakeholder>;
