import { Contact } from '@core/model/contact/contact';
import { Member } from '@core/model/group/member';

export type Person = Contact | Member;
export type Persons = Array<Person>;
