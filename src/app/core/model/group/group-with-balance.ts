import { GroupRootData, Group } from '@core/model/group/group';

export class GroupWithBalance extends Group {
    constructor(
        data: GroupRootData,
        private balance: string,
    ) {
        super(data);
    }

    getBalance(): string {
        return this.balance;
    }

    isDebt(): boolean {
        return this.getRawBalance() < 0;
    }

    private getRawBalance(): number {
        return +this.balance.replace(',', '.');
    }
}

export type GroupsWithBalance = Array<GroupWithBalance>;
