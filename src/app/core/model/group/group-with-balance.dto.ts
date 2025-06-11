import { GroupDTO } from '@core/model/group/group.dto';

export type GroupWithBalanceDTO = GroupDTO & { balance: string };
export type GroupWithBalanceDTOs = Array<GroupWithBalanceDTO>;
