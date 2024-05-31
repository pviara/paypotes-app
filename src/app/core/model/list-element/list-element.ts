import { Contact } from '@core/model/contact/contact';
import { Expense } from '@core/model/expense/expense';

export type ListElement = Contact | Expense | null;

export type ListElements = Array<ListElement>;
