import { Contact } from '@core/model/contact/contact';
import { Expense } from '@core/model/expense/expense';
import { Group } from '@core/model/group/group';

export type ListElement = Contact | Expense | Group | null;

export type ListElements = Array<ListElement>;
