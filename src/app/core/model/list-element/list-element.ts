import { GroupWithBalance } from '../group/group-with-balance';
import { ContactWithBalanceV2 } from '../contact/v2/contact-with-balance';
import { PairExpense } from '../expense/v2/pair-expense';

export type ListElement =
    | ContactWithBalanceV2
    | PairExpense
    | GroupWithBalance
    | null;

export type ListElements = Array<ListElement>;
