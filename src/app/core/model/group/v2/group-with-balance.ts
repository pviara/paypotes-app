import { GroupRootData, GroupV2 } from './group';

export class GroupWithBalance extends GroupV2 {
    constructor(
        data: GroupRootData,
        private balance: string,
    ) {
        super(data);
    }

    getBalance(): string {
        return this.balance;
    }
}
