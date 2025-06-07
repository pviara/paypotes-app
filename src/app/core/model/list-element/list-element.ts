import { Contact } from '@core/model/contact/contact';
import { Expense } from '@core/model/expense/expense';
import { GroupWithBalanceV2 } from '../group/v2/group-with-balance';

export type ListElement = Contact | Expense | GroupWithBalanceV2 | null;

export type ListElements = Array<ListElement>;
