import { GroupDTO } from '@core/model/group/group.dto';
import { MemberDTO } from '@core/model/group/member.dto';

export type CreditDTO = {
    balance: string;
    creditor: MemberDTO;
};

export type GroupExpenseDTO = {
    readonly id: string;
    readonly label: string;
    readonly emoji: string;
    readonly createdAt: string;
    readonly group: GroupDTO;
    readonly credit: CreditDTO;
    readonly balance: string;
};

export type GroupExpenseDTOs = Array<GroupExpenseDTO>;
