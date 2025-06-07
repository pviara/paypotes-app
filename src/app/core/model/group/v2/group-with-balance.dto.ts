import { GroupDTO } from './group.dto';

export type GroupWithBalanceDTO = GroupDTO & { balance: string };
export type GrouWithBalanceDTOs = Array<GroupWithBalanceDTO>;
