import { GroupDTO } from '@core/model/group/group.dto';
import { MemberDTO } from '@core/model/group/member.dto';
import { StakeholderDTOs } from '@core/model/expense/stakeholder.dto';

export type PaymentDTO = {
    balance: string;
    member: MemberDTO;
};

export type GroupExpenseDTO = {
    readonly id: string;
    readonly label: string;
    readonly emoji: string;
    readonly createdAt: string;
    readonly balance: string;
    readonly group: GroupDTO;
    readonly payment: PaymentDTO;
    readonly stakeholders: StakeholderDTOs;
};

export type GroupExpenseDTOs = Array<GroupExpenseDTO>;
