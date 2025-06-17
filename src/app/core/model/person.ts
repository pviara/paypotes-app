import { Contact } from '@core/model/contact/contact';
import { Member } from '@core/model/group/member';
import { User } from '@core/model/user/user';

export type Person = Contact | Member | User;
export type Persons = Array<Person>;
