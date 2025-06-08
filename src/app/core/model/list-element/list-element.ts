import { Expense } from '@core/model/expense/expense';
import { GroupWithBalance } from '../group/group-with-balance';
import { ContactWithBalanceV2 } from '../contact/v2/contact-with-balance';

export type ListElement =
    | ContactWithBalanceV2
    | Expense
    | GroupWithBalance
    | null;

export type ListElements = Array<ListElement>;
