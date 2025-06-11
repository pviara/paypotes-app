import { GroupWithBalance } from '@core/model/group/group-with-balance';
import { ContactWithBalance } from '@core/model/contact/contact-with-balance';
import { PairExpense } from '@core/model/expense/pair-expense';

export type ListElement =
    | ContactWithBalance
    | PairExpense
    | GroupWithBalance
    | null;

export type ListElements = Array<ListElement>;
