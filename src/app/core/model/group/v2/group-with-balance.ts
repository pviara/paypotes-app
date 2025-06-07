import { GroupRootData, GroupV2 } from '@core/model/group/v2/group';

export class GroupWithBalanceV2 extends GroupV2 {
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

export type GroupsWithBalanceV2 = Array<GroupWithBalanceV2>;
