import { Contact } from '@core/model/contact/contact';
import { Expense } from '@core/model/expense/expense';
import { GroupWithBalance } from '../group/group-with-balance';

export type ListElement = Contact | Expense | GroupWithBalance | null;

export type ListElements = Array<ListElement>;
