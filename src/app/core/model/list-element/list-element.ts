import { GroupWithBalance } from '@core/model/group/group-with-balance';
import { ContactWithBalance } from '@core/model/contact/contact-with-balance';
import { GroupExpense } from '../expense/group-expense';
import { PairExpense } from '@core/model/expense/pair-expense';

export type ListElement =
    | ContactWithBalance
    | PairExpense
    | GroupExpense
    | GroupWithBalance
    | null;

export type ListElements = Array<ListElement>;
