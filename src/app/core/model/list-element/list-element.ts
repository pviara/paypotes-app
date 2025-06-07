import { Expense } from '@core/model/expense/expense';
import { GroupWithBalance } from '../group/group-with-balance';
import { ContactWithBalanceV2 } from '../contact/v2/contact-with-balance';
import { Contact } from '../contact/contact';

export type ListElement = Contact | Expense | GroupWithBalance | null;

export type ListElements = Array<ListElement>;
