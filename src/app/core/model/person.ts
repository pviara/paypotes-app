import { Contact } from '@core/model/contact/contact';
import { Member } from '@core/model/group/member';
import { Stakeholder } from '@core/model/expense/stakeholder';
import { User } from '@core/model/user/user';

export type Person = Contact | Member | Stakeholder | User;
export type Persons = Array<Person>;
